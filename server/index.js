const express = require('express')
const cors = require('cors');
const app = express();
const db = require('./models');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Authorization', 'Content-Type'],
  }));

const userRouter = require("./routes/users");
app.use("/", userRouter);
const commentRouter = require("./routes/comments");
app.use("/c", commentRouter);
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