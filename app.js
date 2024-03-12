var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectsRouter = require('./routes/projects');

var app = express();
var config = require('./config/globals'); // Configuration file

// Connecting mongoose;
var mongoose = require('mongoose');

// Passport
var Passport=require("passport");
var session = require(	 "express-session" );
var LocalStrategy = require("passport-local").Strategy;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//configure passport module
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: false
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// configure mongoose
mongoose
.connect(config.db)
.then((message)=>{
  console.log('Connected Successfully');
})
.catch((err)=>{
  console.error('Error while connecting'+err);
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

module.exports = app;
