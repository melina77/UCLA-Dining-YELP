const express = require('express')
const cors = require('cors');
const app = express();
const db = require('./models');
require('dotenv').config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));

const userRouter = require("./routes/users");
app.use("/", userRouter);
const commentRouter = require("./routes/comments");
app.use("/c", commentRouter);
const foodRouter = require("./routes/food");
app.use("/f", foodRouter);
const calRouter = require("./routes/calcounter");
app.use("/count", calRouter);

db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log("Server started")
    })
});