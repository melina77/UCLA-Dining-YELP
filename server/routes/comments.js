const express = require("express");
const router = express.Router();
const { students, comments, dining, food } = require("../models");
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
        // Allow both dining workers and students to comment
        if (req.user.username) {
            user = await students.findOne({ where: { username: req.user.username, id: req.user.id } });
        } else {
            user = await dining.findOne({ where: { name: req.user.name, id: req.user.id } });
        }
    
        // For students
        if (user && req.user.username) {
            if (req.file) {
                await comments.create({
                    poster: req.user.username,
                    body: req.body.body,
                    image: req.file.filename,
                    foodId: req.params.postId,
                    studentId: req.user.id
                });
            // No image provided
            } else {
                await comments.create({
                    poster: req.user.username,
                    body: req.body.body,
                    image: null,
                    foodId: req.params.postId,
                    studentId: req.user.id
                });
            }
            res.json({ "message": "Comment created" });

        // For dining hall workerse
        } else if (user && req.user.name) {
            if (req.file) {
                await comments.create({
                    poster: req.user.name,
                    body: req.body.body,
                    image: req.file.filename,
                    foodId: req.params.postId,
                    diningId: req.user.id
                });
            // No image provided
            } else {
                await comments.create({
                    poster: req.user.name,
                    body: req.body.body,
                    image: null,
                    foodId: req.params.postId,
                    diningId: req.user.id
                });
            }
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

    const result = await comments.findAll({ 
        where: {foodId: req.params.postId}, order: [['createdAt', 'DESC']]
    });
    res.json(result);
});

// Remove a comment by its ID
router.delete("/:commentId", validate, async (req, res) => {
    try {
        const comment = await comments.findOne({ where: { id: req.params.commentId } });

        if (!comment) {
            return res.status(404).json({ "error": "Comment not found" });
        }

        // Check if the user is authorized to delete the comment
        if (comment.studentId !== req.user.id && comment.diningId !== req.user.id) {
            return res.status(403).json({ "error": "Not authorized to delete this comment" });
        }

        // Delete the comment
        await comment.destroy();
        res.json({ "message": "Comment deleted successfully" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ "error": "Internal server error" });
    }
});

module.exports = router;
