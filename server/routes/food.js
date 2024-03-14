const express = require("express");
const router = express.Router();
const { dining, food, likes } = require("../models");
const multer = require("multer");
const sequelize = require("sequelize");
const { validate } = require("./auth")

//handles uploading images
const storage = multer.diskStorage({
    //sends uploaded images to external file called post_photos in backend
    destination: (req, file, cb) => {
      cb(null, 'post_photos/');
    },
    //sets filename and makes it unique by prepending Date.now() to the original file name
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/", validate, upload.single('image'), async (req, res) =>{
    let user;

    //checks if a user is currently signed in through validation middleware
    if (req.user.name) {
        user = await dining.findOne({ where: {name: req.user.name, id: req.user.id}});
    } else {
        user = await students.findOne({where: {name: req.user.username, id: req.user.id}});
    }

    //if a user exists, create a new food item
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
    } else{
        res.status(401).json({"message": "Not a dining hall user"});
    }
});

// Delete a food item by ID
router.delete("/:id", validate, async (req, res) => {
    try {
        const postId = req.params.id;
        const user = req.user;

        const post = await food.findOne({ where: { id: postId } });

        if (!post) {
            return res.status(404).json({ "message": "Post not found" });
        }

        if (post.poster !== user.name) {
            return res.status(403).json({ "message": "You are not authorized to delete this post" });
        }

        await post.destroy();
        res.json({ "message": "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ "message": "Internal server error" });
    }
});

//gets all the food items and sorts it by the time it was posted
router.get("/", async (req, res) =>{
    const startOfDay = new Date();
    const endOfDay = new Date();
    const result = await food.findAll({
        include: [likes],
        order: [['createdAt', 'DESC'], 'name'],
    });
    res.json(result);
});

router.get("/:postid", async (req, res) =>{
    const result = await food.findAll({
        where: {id: req.params.postid},
        attributes: ['name']
    });
    res.json(result);
});

//able to search through food items created at a certain time
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