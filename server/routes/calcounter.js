const express = require("express");
const router = express.Router();
const { students, calcounter, food } = require("../models");
const sequelize = require("sequelize");
const { validate } = require("./auth");

router.post("/", validate, async (req, res) =>{
    console.log(req.user);
    const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
    if(user){
        console.log("user:", user);
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
    const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
    if(user && req.params.studentId == req.user.id){

        // Get foodId and calories from calcounter table
        const result = await calcounter.findAll({
            attributes: ['foodId', 'calories'],
            where: { studentId: req.params.studentId },
        });

        // Extract foodId from data
        const foodIds = result.map(item => item.foodId);

        // Query food table for food names using foodIds
        const foodNames = await food.findAll({
            attributes: ['id', 'name'],
            where: { id: foodIds },
        });

        // Map foodIds to names
        const foodMap = {};
        foodNames.forEach(item => {
            foodMap[item.id] = item.name;
        });

        const finalResult = result.map(item => ({
            foodName: foodMap[item.foodId],
            calories: item.calories
        }));

        res.json({ result: finalResult });
    }else {
        res.status(401).json({message: "You do not have access to this page"})
    }
});

module.exports = router;