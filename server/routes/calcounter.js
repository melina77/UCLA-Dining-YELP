const express = require("express");
const router = express.Router();
const { students, calcounter } = require("../models");
const sequelize = require("sequelize");
const { validate } = require("./auth");

router.post("/", validate, async (req, res) =>{
    const user = await students.findOne({ where: {username: req.user.name, id: req.user.id}});
    if(user){
        const result = await calcounter.findOne({
            where: { foodId: req.body.foodId, studentId: req.user.id },
        });
        if(!result){
            await calcounter.create({ foodId: req.body.foodId, studentId: req.user.id, calories: req.body.calories });
            res.json({ added: true });
        }
        else {
            await calcounter.destroy({ where: { foodId: req.body.foodId, studentId: req.user.id }});
            res.json({ added: false });
        }
    }else {
        res.json({ added: false });
    }
});

router.get("/:studentId", validate, async (req, res) =>{
    const user = await students.findOne({ where: {username: req.user.name, id: req.user.id}});
    if(user && req.params.studentId == req.user.id){
        const result = await calcounter.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('calories')), 'totalCalories'],
            ],
            where: { studentId: req.params.studentId },
        });
        res.json({ result });
    }else {
        res.json({message: "You do not have access to this page"})
    }
});

module.exports = router;