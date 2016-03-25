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
var port = process.env.PORT || 9000;
var ip = '192.168.1.189';

console.log('Server modules imported successfully');

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
app.get('*', function(req, res) {
  res.sendFile('/app/index.html', { root: __dirname });
});

/*
  Lift Off
*/
app.listen(port, ip);
console.log('Node http server(' + ip + ') lending an ear on port ' + port);
