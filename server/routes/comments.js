const express = require("express");
const router = express.Router();
const { students, comments, dining } = require("../models");
const multer = require("multer");
const { validate } = require("./auth");

//handles image uploads
const storage = multer.diskStorage({
    //uploaded images will be sent to the comment_photos directory in the server
    destination: (req, file, cb) => {
      cb(null, 'comment_photos/');
    },
    //the name of the file name in the directory will be unique, as Date.now() is prepended to the original file name
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/:postId", validate, upload.single('image'), async (req, res) =>{
    try {
        let user;
        //checks if the validation middleware was able to find a valid token
        //searches through both the student and dining database tables to search for the currently logged in user
        if (req.user.username) {
            user = await students.findOne({ where: { username: req.user.username, id: req.user.id } });
        } else {
            user = await dining.findOne({ where: { name: req.user.name, id: req.user.id } });
        }

        //checks if a student user exists and if the middleware validated and creates a comment
        if(user && req.user.username && req.file){
            await comments.create({
                poster: req.user.username,
                body: req.body.body,
                image: req.file.filename,
                foodId: req.params.postId,
                studentId: req.user.id
            });
            res.json({ "message": "Comment created" });
        }
        else if(user && req.user.name && req.file){
            await comments.create({
                poster: req.user.name,
                body: req.body.body,
                image: req.file.filename,
                foodId: req.params.postId,
                studentId: req.user.diningId
            });
            res.json({ "message": "Comment created" });
        }
        else if (user && req.user.username) {
            await comments.create({
                poster: req.user.username,
                body: req.body.body,
                foodId: req.params.postId,
                studentId: req.user.id
            });
            res.json({ "message": "Comment created" });
        //checks if a dining hall user exists and creates a comment
        } else if (user && req.user.name) {
            await comments.create({
                poster: req.user.name,
                body: req.body.body,
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

//gets all comments from a given food posts, given its id
router.get("/:postId", async (req, res) =>{
    console.log(req.params.postId);
    const result = await comments.findAll({ 
        where: {foodId: req.params.postId}, order: [['createdAt', 'DESC']]
    });
    res.json(result);
});

module.exports = router;
