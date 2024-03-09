const express = require('express')
const app = express();
const db = require('./models');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.json());
const userRouter = require("./routes/users");
app.use("/", userRouter);

db.sequelize.sync().then(() => {
    app.listen(8080, ()=>{
        console.log("Server started")
    })
});