const express = require('express');

const Articles = require('../schemas/articles');
const Users = require("../schemas/Users.js");
const router = express.Router();
const authmiddleware = require("../middle/auth-middlewares");




module.exports = router