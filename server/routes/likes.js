const express = require("express");
const router = express.Router();
const { students, likes, dining } = require("../models");
const { validate } = require("./auth");

router.post("/", validate, async (req, res) => {
    const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
    
    if(user){
        const result = await likes.findOne({
            where: { foodId: req.body.foodId, studentId: req.user.id },
        });
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

router.get("/:foodId", validate, async (req, res) => {

    const user = await students.findOne({ where: {id: req.user.id}});
    
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