const express = require('express')
cors = require('cors')

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));