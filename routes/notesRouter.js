var express = require('express');
const bodyParser = require('body-parser');
//const User = require('../models/user');
const notesRouter = express.Router();
var authenticate2 = require('../authenticate/authenticate');
const Sequelize = require('sequelize')
//var cors = require('cors');
notesRouter.use(bodyParser.json());
const db = require("../models/index");
const User = db['user'];
const Lesson = db['lesson'];
const Note = db['note'];
const config = require("../config/jwtconfig");

//const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const lesson = require('../models/lesson');
const note = require('../models/note');



notesRouter.route('/:lessonId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })

  //get: get the all notes of a specific user and specific lesson  
  .get(authenticate2.verifyToken, (req, res, next) => {
    Note.findAll({ where: { user_id: req.userId, lesson_id: req.params.lessonId } })

      .then((notes) => {
        if (!notes) {
          res.status(404).send("(notes not found!");
          console.log("(notes not found!");
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(notes)
      })
      .catch(error => {
        res.status(400).send(error)
      })
  })

  //post:add a note to specific user and specific lesson
   .post(authenticate2.verifyToken, (req, res, next) => {
    Note.create({
      text: req.body.note,
      user_id: req.userId,
      lesson_id: req.params.lessonId
          })
      .then(user => {
        res.send({ message: "note was registered successfully!" });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  })
 
  //delete: delete a specific note
  .delete(authenticate2.verifyToken, (req, res, next) => {
    Note.destroy({ where: { user_id: req.userId, lesson_id: req.params.lessonId } })
      .then(user => {
        res.send({ message: "note was deleted successfully!" });

      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  });

  module.exports = notesRouter;