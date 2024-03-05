const express = require("express");
const router = express.Router();
const { students, likes } = require("../models");
const { validate } = require("./auth");

router.post("/", validate, async (req, res) => {
    const user = await students.findOne({ where: {username: req.user.name, id: req.user.id}});
    if(user){
        const liked = await likes.findOne({
            where: { foodId: req.body.foodId, studentId: req.user.id },
        });
        if(!liked){
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

module.exports = router;