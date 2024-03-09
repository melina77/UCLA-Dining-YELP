const express = require("express");
const router = express.Router();
const { dining, food, likes } = require("../models");
const multer = require("multer");
const sequelize = require("sequelize");
const { validate } = require("./auth")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'post_photos/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/", validate, upload.single('image'), async (req, res) =>{
    const user = await dining.findOne({ where: {name: req.user.name, id: req.user.id}});
    if(user){
        await food.create({
            poster: req.user.name,
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            calories: req.body.calories,
            diningId: req.user.id,
        });
        res.json({ "message": "Post created" });
    }else{
        res.json({"message": "Not a dining hall user"});
    }
});

router.get("/", async (req, res) =>{
    const startOfDay = new Date();
    const endOfDay = new Date();
    const result = await food.findAll({
        include: [likes],
        order: [['createdAt', 'DESC']],
    });
    res.json(result);
});

router.get("/:time", async (req, res) =>{
    const startOfDay = new Date();
    const endOfDay = new Date();
    if(req.params.time == "breakfast"){
        const result = await food.findAll({
            where: {updatedAt: { [sequelize.Op.between]: [startOfDay.setHours(7, 0, 0, 0), endOfDay.setHours(10, 0, 0, 0)]}},
            include: [likes],
            order: [['createdAt', 'DESC']],
        });
        res.json(result);
    }
    else if(req.params.time == "lunch"){
        const result = await food.findAll({
            where: {updatedAt: { [sequelize.Op.between]: [startOfDay.setHours(11, 0, 0, 0), endOfDay.setHours(15, 0, 0, 0)]}},
            include: [likes],
            order: [['createdAt', 'DESC']],
        });
        res.json(result);
    }
    else if(req.params.time == "dinner"){
        const result = await food.findAll({
            where: {updatedAt: { [sequelize.Op.between]: [startOfDay.setHours(17, 0, 0, 0), endOfDay.setHours(21, 0, 0, 0)]}},
            include: [likes],
            order: [['createdAt', 'DESC']],
        });
        res.json(result);
    }
    else if(req.params.time == "late"){
        const result = await food.findAll({
            where: {updatedAt: { [sequelize.Op.between]: [startOfDay.setHours(21, 0, 0, 0), endOfDay.setHours(24, 0, 0, 0)]}},
            include: [likes],
            order: [['createdAt', 'DESC']],
        });
        res.json(result);
    }
});

module.exports = router;