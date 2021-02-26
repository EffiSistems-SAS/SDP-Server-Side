const express = require('express');
const serverConfig = require('./config/server');
const getDatabaseConnection = require('./config/db');

const app = express();

app.get('/', (req,res) => {
    res.send('SDP SERVER');
})

getDatabaseConnection();
serverConfig(app);