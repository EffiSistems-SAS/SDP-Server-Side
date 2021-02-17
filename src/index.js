const express = require('express');
const serverConfig = require('./config/server');
const getDatabaseConnection = require('./config/db');

const app = express();

getDatabaseConnection();
serverConfig(app);