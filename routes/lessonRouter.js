var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
const lessonRouter = express.Router();
var authenticate = require('../authenticate/authenticate');
const Sequelize = require('sequelize')
var cors = require('cors');
lessonRouter.use(bodyParser.json());
const db = require("../models/index");
const Lesson = db['lesson'];
const User = db['user'];



lessonRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })

    /* GET lessons listing. */
    .get((req, res, next) => {
        Lesson.findAll({
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "username", "email"],
                    through: {
                        attributes: [],
                    }
                },
            ],
        })
            .then(lessonResponse => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lessonResponse)
            })
            .catch(error => {
                res.status(400).send(error)
            })

    })

    // To create a new lesson
    .post((req, res, next) => {
        Lesson.create(req.body)
            .then(lessonResponse => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lessonResponse)
            })
            .catch(error => {
                res.status(400).send(error)
            })
    });

lessonRouter.route('/:lessonId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    //to see a specific lesson
    .get(authenticate.verifyToken, (req, res, next) => {
        Lesson.findOne({ "_id": req.params.lessonId }, {
            include: [
                {
                    model: User,
                    as: "users",
                    attributes: ["id", "username", "email"],
                    through: {
                        attributes: [],
                    }
                },
            ],
        })
            .then(lessonResponse => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lessonResponse)
            })
            .catch(error => {
                res.status(400).send(error)
            })
    })

module.exports = lessonRouter;