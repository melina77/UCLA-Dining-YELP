const express = require('express')
const app = express()
const db = require('./models')
require('dotenv').config();

app.use(express.json());
