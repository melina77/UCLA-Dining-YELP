const express = require("express");
const router = express.Router();
const { students, comments, dining } = require("../models");
const multer = require("multer");
const sequelize = require("sequelize");
const { validate } = require("./auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'comment_photos/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

// router.post("/:postId", validate, upload.single('image'), async (req, res) =>{
//     const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
//     if(user){
//         await comments.create({
//             body: req.body.body,
//             image: req.file.filename,
//             foodId: req.params.postId,
//             studentId: req.user.id
//         });
//         res.json({ "message": "Comment created" });
//     }else{
//         res.json({ "message": "Not a student user"});
//     }
// });

router.post("/:postId", validate, upload.single('image'), async (req, res) =>{
    try {
        let user;

        if (req.user.username) {
            user = await students.findOne({ where: { username: req.user.username, id: req.user.id } });
        } else {
            user = await dining.findOne({ where: { name: req.user.name, id: req.user.id } });
        }

        if (user && req.user.username) {
            await comments.create({
                poster: req.user.username,
                body: req.body.body,
                image: req.file.filename,
                foodId: req.params.postId,
                studentId: req.user.id
            });
            res.json({ "message": "Comment created" });
        } else if (user && req.user.name) {
            await comments.create({
                poster: req.user.name,
                body: req.body.body,
                image: req.file.filename,
                foodId: req.params.postId,
                studentId: req.user.diningId
            });
            res.json({ "message": "Comment created" });
        } else {
            res.json({ "message": "Not a student user" });
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ "error": "Internal server error" });
    }
});

// router.post("/:postId", validate, async (req, res) =>{
//     const user = await students.findOne({ where: {username: req.user.name, id: req.user.id}});
//     if(user){
//         await comments.create({
//             body: req.body.body,
//             // image: req.body.image,
//             foodId: req.params.postId,
//             studentId: req.user.id
//         });
//         res.json({ "message": "Comment created" });
//     }else{
//         res.json({ "message": "Not a student user"});
//     }
// });

router.get("/:postId", async (req, res) =>{
    console.log(req.params.postId);
    const result = await comments.findAll({ 
        where: {foodId: req.params.postId}, order: [['createdAt', 'DESC']]
    });
    res.json(result);
});

module.exports = router;
