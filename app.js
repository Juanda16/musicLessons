const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var path = require('path');
const db = require("./models");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lessonRouter = require('./routes/lessonRouter');
const notesRouter = require('./routes/notesRouter');
var passport = require('passport');
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
var corsOptions = {
    origin: "http://localhost:3001"
  };
app.use(cors(corsOptions));  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySql
  /* db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    
  });  */

db.sequelize.sync();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
db.sequelize.sync();
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lessons',lessonRouter);
app.use('/notes',notesRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });