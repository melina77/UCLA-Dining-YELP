const express = require("express");
const router = express.Router();
const { comments } = require("../models");
const { validate } = require("auth.js")

router.post("/comments", validate, async (req, res) =>{
    await comments.create({
        body: req.body.body,
        image: req.body.image,
        studentId: req.user.id
    });
})

module.exports = router;
