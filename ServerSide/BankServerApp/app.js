var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');


const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/bankDB';
mongoose.connect(mongoDB);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const User = require('./model/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// CORS Problem solution
app.use(function (req, res, next) {

  console.log('checking header');
  //console.log(req.headers);
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// checking token
app.use(function (req, res, next) {

  // dont check token for login
  if (req.url === '/users/authenticate')
    return next();

  // check for all except login 
  //console.log ('****************url:'+req.url);

  console.log('checking token..');
  console.log(req.headers);
  let token = req.headers['authorization'];
  console.log('token:' + token);


  if (!token) { // no token
    console.log('no token..');
    return res.status(200).send({ auth: false });

  } else { // there is a token
    console.log('existing token..');

    // get the token
    let token2 = token.split(' ')[1];
    console.log('token after split:' + token2);

    // make sure the token is for existing user
    jwt.verify(token2, 'supersecret', function (err, decoded) {
      console.log('user:' + JSON.stringify(decoded));

      // get the user from database
      User.findOne({ 'username': decoded.id })
        .exec(function (err, user) {
       
          if (err) {
            console.log('authentication error');
            return next(err);
          }

          if (user) {
          //  res.status(200).send({ auth: true, token: token });
            console.log('authenticated request');
           // return next();
          }

          else {
            console.log('no user found');
            // res.json({'message' : 'User not found'});
            res.status(200).send({ auth: false });
            return next(err);
          }
        });



      if (err) {
        console.log('error ' + err);
        return res.status(200).send({ auth: false, message: 'Failed to authenticate token.' });
      }

      console.log('token verified');

      next();
    });
  }



  console.log('out async');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
 // res.status(err.status || 500);
  //res.render('error');
});
app.listen(3000);
module.exports = app;
