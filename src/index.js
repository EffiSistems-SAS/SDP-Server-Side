const express = require('express');
const serverConfig = require('./config/server');
const getDatabaseConnection = require('./config/db');

const app = express();

app.get('/', (req,res) => {
    res.send('<h1>SDP SERVER</h1>');
})

getDatabaseConnection();
serverConfig(app);