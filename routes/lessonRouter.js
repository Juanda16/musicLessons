var express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
var passport = require('passport');
const userRouter = express.Router();
var authenticate = require('../authenticate');
//var cors = require('cors');
userRouter.use(bodyParser.json());

module.exports = userRouter;