const express = require("express");
const router = express.Router();
const { students, calcounter, food } = require("../models");
const { validate } = require("./auth");

//router that handles post requests to localhost:8080/calorie-counter/
router.post("/", validate, async (req, res) =>{
    //searches database for a student user
    const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
    //if a user exists, then either create or destroy an entry in the database
    if(user){
        //checks calorie counter database table to see if an entry of a student adding the same food item to calorie counter exists
        const result = await calcounter.findOne({
            where: { foodId: req.body.foodId, studentId: req.user.id },
        });
        //if there is no duplicate entry, then create a new calorie counter entry. otherwise, delete the old entry
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

//router that handles get requests to localhost:8080/calorie-couter/:studentId
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
            foodId: item.foodId,
            foodName: foodMap[item.foodId],
            calories: item.calories
        }));

        res.json({ result: finalResult });
    }else {
        res.status(401).json({message: "You do not have access to this page"})
    }
});

module.exports = router;