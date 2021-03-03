const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const lessonRouter = require('./routes/lessonRouter');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

const PORT = process.env.PORT || 3050;

const app = express();
app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'musiclessonsdb'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
//app.use(passport.session());

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