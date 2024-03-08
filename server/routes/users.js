const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { students, dining } = require("../models");

router.post("/student-register", async (req, res) =>{
    students.findAll({
        where: {username: req.body.username, email: req.body.email}
    }).then(acc => {
        if(!acc){
            bcrypt.hash(req.body.password, 10).then((hash) =>{
                students.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                }).then(user =>{
                    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY , { expiresIn: '2h' });
                    res.json({ token });
                })
            });
        } else {
            res.json({ message: 'Username or email already taken' });
        }
    });
});

router.post("/dining-register", async (req, res) =>{
    dining.findOne({
        where: {name: req.body.name}
    }).then(acc => {
        if(!acc){
            bcrypt.hash(req.body.password, 10).then((hash) =>{
                dining.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                }).then(user =>{
                    const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY , { expiresIn: '2h' });
                    res.json({ token });
                })
            });
        } else {
            res.json({ message: 'Email already taken' });
        }
    });
});

module.exports = router;
