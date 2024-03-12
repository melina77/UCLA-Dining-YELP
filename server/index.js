const express = require('express')
const app = express();
const db = require('./models');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use('/images', express.static('post_photos'));
app.use('/comimages', express.static('comment_photos'));

app.use(express.json());
const userRouter = require("./routes/users");
app.use("/", userRouter);
const commentRouter = require("./routes/comments");
app.use("/c", commentRouter);
app.use("/home", commentRouter);
const foodRouter = require("./routes/food");
app.use("/f", foodRouter);
const calRouter = require("./routes/calcounter");
app.use("/count", calRouter);
const likeRouter = require("./routes/likes");
app.use("/l", likeRouter);

db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log("Server started")
    })
});