const express = require("express");
const router = express.Router();
const { calcounter } = require("../models");
const { validate } = require("./auth");

router.post("/", validate, async (req, res) =>{
    const user = await students.findOne({ where: {username: req.user.name, id: req.user.id}});
    if(user){
        const result = await calcounter.findOne({
            where: { foodId: req.body.foodId, studentId: req.user.id },
        });
        if(!result){
            await calcounter.create({ foodId: req.body.foodId, studentId: req.user.id });
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

module.exports = router;