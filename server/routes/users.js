const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { students, dining } = require("../models");

router.post("/student-register", async (req, res) =>{
    students.findOne({
        where: {username: req.body.username}
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
            res.status(401).json({ message: 'Username or email already taken' });
        }
    });
});

router.post("/dining-register", async (req, res) =>{
    dining.findOne({
        where: {email: req.body.email}
    }).then(acc => {
        if(!acc){
            bcrypt.hash(req.body.password, 10).then((hash) =>{
                dining.create({
                    name: req.body.dining_hall_name,
                    email: req.body.email,
                    password: hash,
                }).then(user =>{
                    const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY , { expiresIn: '2h' });
                    res.json({ token });
                })
            });
        } else {
            res.status(401).json({ message: 'Email already taken' });
        }
    });
});

router.post("/student-login", async (req, res) => {
    const user = await students.findOne({
        where: {username: req.body.username, email: req.body.email}
    });
    if(!user){
        res.status(401).json({ message: 'Username or email does not exist'});
    } else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Password does not match'});
        } else {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY , { expiresIn: '2h' });
            res.json({ token });
        }
    }
});

router.post("/dining-login", async (req, res) => {
    const user = await dining.findOne({
        where: {email: req.body.email, name: req.body.dining_hall_name}
    });
    if(!user){
        res.status(401).json({ message: 'Email does not exist'})
    }
    else {
        await bcrypt.compare(req.body.password, user.password).then(match =>{
            if(!match){
                res.status(401).json({ message: 'Password does not match'})
            } else {
                const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY , { expiresIn: '2h' });
                res.json({ token })
                }
        });
    }
});

module.exports = router;
