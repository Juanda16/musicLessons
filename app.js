const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var path = require('path');
const db = require("./models");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lessonRouter = require('./routes/lessonRouter');
var passport = require('passport');
var authenticate = require('./authenticate/authenticate');
//var dbconfig = require('./config/dbconfig.json');
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
  };
app.use(cors(corsOptions));  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySql
   db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    
  });  

db.sequelize.sync();
/* const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'musiclessonsdb'
}); */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Check connect
/* connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
}); */

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
//app.use(passport.session());
db.sequelize.sync();
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lessons',lessonRouter);


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