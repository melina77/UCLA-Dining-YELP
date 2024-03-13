//required dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
require('dotenv').config();

//set up cors to allow frontend to make requests to backend server
app.use(cors());

//static images can be retrieved from the express.static directories
app.use('/images', express.static('post_photos'));
app.use('/comimages', express.static('comment_photos'));

//can parse JSON data from http requests
app.use(express.json());

//set up routers for http requests
const userRouter = require("./routes/users");
app.use("/", userRouter);

const commentRouter = require("./routes/comments");
app.use("/c", commentRouter);

const foodRouter = require("./routes/food");
app.use("/posts", foodRouter);
app.use("/f", foodRouter);

const calRouter = require("./routes/calcounter");
app.use("/calorie-counter", calRouter);

const likeRouter = require("./routes/likes");
app.use("/l", likeRouter);

//runs server on port 8080
db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log("Server started")
    })
});