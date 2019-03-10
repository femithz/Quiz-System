var createError = require('http-errors');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
require('dotenv').config()
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var app = express();
const PORT=8080;
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// passport
var passport=require('passport');
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
app.use(session({
  name:'secret',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
    maxAge:36000000,
    // httpOnly:false,
    secure:false
  },
   store:new MongoStore({
     mongooseConnection:mongoose.connection,
     clear_interval: 3600
     })
}));
app.use(passport.initialize());
app.use(passport.session());
require('./passport-config');
require('./config/auth');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
mongoose.connect('mongodb://localhost/quiz-system',{ 
  useCreateIndex: true,
  useNewUrlParser: true
 });
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT, ()=>{
  console.log('Server is running on port ' + PORT);
});
module.exports = app;
