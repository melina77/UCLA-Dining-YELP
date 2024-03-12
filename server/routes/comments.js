const express = require("express");
const router = express.Router();
const { students, comments } = require("../models");
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
    
    const user = await students.findOne({ where: {username: req.user.username, id: req.user.id}});
    if(user){
        await comments.create({
            poster: req.user.username,
            body: req.body.body,
            image: req.file.filename,
            foodId: req.params.postId,
            studentId: req.user.id
        });
        res.json({ "message": "Comment created" });
    }else{
        res.json({ "message": "Not a student user"});
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
