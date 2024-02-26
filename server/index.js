const express = require('express')
const app = express();
const db = require('./models');
require('dotenv').config();

app.use(express.json());
const userRouter = require("./routes/users");
app.use("/", userRouter);
const commentRouter = require("./routes/comments");
app.use("/c", commentRouter);

db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log("Server started")
    })
});