var express = require('express');
const bodyParser = require('body-parser');
//const User = require('../models/user');
var passport = require('passport');
const userRouter = express.Router();
var authenticate = require('../authenticate/verifySignUp');
const Sequelize = require( 'sequelize' )
//var cors = require('cors');
userRouter.use(bodyParser.json());
const db = require("../models/index");
const User = db['user'];
const config = require("../config/jwtconfig");

//const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/* GET users listing. */
 userRouter.route('/')
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next)=>{
  User.findAll()
    .then( userResponse => {
      res.setHeader('Content-Type', 'application/json');
      res.status( 200 ).json( userResponse )
    })
    .catch( error => {
      res.status( 400 ).send( error )
    })
} );
   
userRouter.route('/signup')
.post(authenticate.checkDuplicateUsernameOrEmail, (req, res, next) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ message: "User was registered successfully!" });
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});
  


userRouter.route('/login')
.post((req, res) => {

  User.findOne({
    where: {
      email: req.body.email,
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
       /* user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        } 
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          //roles: authorities,
          accessToken: token
        });
      }); */
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        //roles: authorities,
        accessToken: token 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
})
});

module.exports = userRouter;
/*


userRouter.route('/logout')
.get((req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});  */


