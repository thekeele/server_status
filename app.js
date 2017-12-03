/*
  Server Status SPA
  app.js
*/

/*
  Set Up
  - pull in our required modules
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

console.log('Server modules imported successfully');

/* Load configuration file */
var config = require('./config.json')[app.get('env')];

/*
  Express App Set Up
*/
app.use(express.static(path.join(__dirname, '/app')));
app.use(favicon(path.join(__dirname, 'app/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

console.log('Express App Configured');

/*
  Routing
*/
app.get('/', function(req, res) {
  res.sendFile('/app/index.html', { root: __dirname });
});

/*
  Lift Off
*/
app.listen(config.statusPort, config.statusHost);
console.log('Node http server(' + config.statusHost + ') lending an ear on port ' + config.statusPort);
