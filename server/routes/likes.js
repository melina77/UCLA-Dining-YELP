const express = require("express");
const router = express.Router();
const { students, likes, dining } = require("../models");
const { validate } = require("./auth");

router.post("/", validate, async (req, res) => {
    //validates middleware to make sure a student is logged in
    const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
    
    if(user){
        //searches database for an instance of likes that already exists, corresponding to the same food item and user
        const result = await likes.findOne({
            where: { foodId: req.body.foodId, studentId: req.user.id },
        });
        //if there is not already an item in the database table, create a new row in the columns database
        //otherwise delete the instance that is already in the database
        if(!result){
            await likes.create({ foodId: req.body.foodId, studentId: req.user.id });
            res.json({ liked: true });
        }
        else {
            await likes.destroy({ where: { foodId: req.body.foodId, studentId: req.user.id }});
            res.json({ liked: false });
        }
    }else {
        res.json({ liked: false });
    }
})

//handles get requests to retrieve likes on a certain post
router.get("/:foodId", validate, async (req, res) => {
    //first checks that a student user exists
    const user = await students.findOne({ where: {id: req.user.id}});
    //if so, find whether or not a user liked a post
    if(user){
        const result = await likes.findOne({
            where: { foodId: req.params.foodId, studentId: req.user.id },
        });
        if(result){
            res.json({ liked: true });
        }
        else {
            res.json({ liked: false });
        }
    }else {
        res.json({ liked: false });
    }
})

module.exports = router;