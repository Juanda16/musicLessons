var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
const lessonRouter = express.Router();
var authenticate = require('../authenticate/authenticate');
const Sequelize = require( 'sequelize' )
//var cors = require('cors');
lessonRouter.use(bodyParser.json());
const db = require("../models/index");
const Lesson = db['lesson'];


//const Op = db.Sequelize.Op;

/* GET users listing. */
lessonRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})

.get((req, res, next)=>{
    Lesson.findAll()
    .then( lessonResponse => {
      res.status( 200 ).json( lessonResponse )
    })
    .catch( error => {
      res.status( 400 ).send( error )
    })
})

.post((req, res, next)=>{
    Lesson.create(req.body)
      .then( lessonResponse => {
        res.setHeader('Content-Type', 'application/json');
        res.status( 200 ).json( lessonResponse )
      })
      .catch( error => {
        res.status( 400 ).send( error )
      })
  } );

module.exports = lessonRouter;