var express = require('express');
var jwt = require('express-jwt');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');

global.AppRoot = path.resolve(__dirname);
var config = require(path.join(__dirname, 'configurations/config'));
var oAuth = require(path.join(__dirname, 'configurations/auth'));
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

var authCheck = jwt({
  secret: oAuth.AuthO.clientSecret,
  audience: oAuth.AuthO.clientID
});

var routes = require('./routes/index');
var items = require('./routes/item')(authCheck);
var zips=require('./routes/zip')();

app.use('/', routes);
app.use('/items', items);
app.use('/zips',zips);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
