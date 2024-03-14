const express = require("express");
const { Op } = require('sequelize');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { students, dining } = require("../models");

//registers students
router.post("/student-register", async (req, res) =>{
    //checks if a student user exists
    students.findOne({
        where: {
            [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
        }
    })
    .then(acc => {
        //if a student user does not exist, then create a new user
        if(!acc){
            //hashes password
            bcrypt.hash(req.body.password, 10).then((hash) =>{
                students.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: hash,
                }).then(user =>{
                    //creates a token corresponding to the newly created user's id and username
                    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY , { expiresIn: '2h' });
                    res.json({ token });
                })
            });
        } else {
            res.status(401).json({ message: 'Username or email already taken' });
        }
    })
    .catch(error => {
        // Catching Sequelize errors related to email validation
        res.status(400).json({ message: 'Invalid email format' });
    });
});

//registers dining hall users
router.post("/dining-register", async (req, res) =>{
    //checks if a dining hall user with the same email already exists
    dining.findOne({
        where: {email: req.body.email}
    }).then(acc => {
        //if a dining hall user does not exist, then create a new dining hall user
        if(!acc){
            //hashes the password
            bcrypt.hash(req.body.password, 10).then((hash) =>{
                dining.create({
                    name: req.body.dining_hall_name,
                    email: req.body.email,
                    password: hash,
                }).then(user =>{
                    //creates a token corresponding to the newly created user's id and name
                    const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY , { expiresIn: '2h' });
                    res.json({ token });
                })
            });
        } else {
            res.status(401).json({ message: 'Email already taken' });
        }
    })
    .catch(error => {
        // Catching Sequelize errors related to email validation
        res.status(400).json({ message: 'Invalid email format' });
    });
});

//allows student users to login
router.post("/student-login", async (req, res) => {
    //checks if a user already exists corresponding to the credentials in username and email
    const user = await students.findOne({
        where: {username: req.body.username, email: req.body.email}
    });
    if(!user){
        res.status(401).json({ message: 'Username or email does not exist'});
    } else {
        //checks if decrypted password matches the password provided in the request body
        //if they match, create a token for the user
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            res.status(401).json({ message: 'Password does not match'});
        } else {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY , { expiresIn: '2h' });
            res.json({ token });
        }
    }
});

//allows dining hall users to log in
router.post("/dining-login", async (req, res) => {
    //checks if a dining hall user exists
    const user = await dining.findOne({
        where: {email: req.body.email, name: req.body.dining_hall_name}
    });
    if(!user){
        res.status(401).json({ message: 'Email does not exist'})
    }
    else {
        //compares password given through request body is the same as the decrypted password in the database
        await bcrypt.compare(req.body.password, user.password).then(match =>{
            if(!match){
                res.status(401).json({ message: 'Password does not match'})
            } else {
                //creates token for logged in dining hall user
                const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY , { expiresIn: '2h' });
                res.json({ token })
                }
        });
    }
});

module.exports = router;
