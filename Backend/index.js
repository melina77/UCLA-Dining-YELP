const express = require('express')
const app = express()
const db = require('./models')
require('dotenv').config();

app.use(express.json());
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", port);
  });