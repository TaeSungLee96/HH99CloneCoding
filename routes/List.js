const express = require('express');

const Articles = require('../schemas/articles');
const Users = require("../schemas/users.js");
const router = express.Router();
const authmiddleware = require("../middle/auth-middlewares");




module.exports = router