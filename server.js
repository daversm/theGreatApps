var fs           = require('fs');
var path         = require('path');
var port         = process.env.PORT || 8080;
var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
//var MongoClient  = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var request      = require('request');
var passport     = require('passport');
var flash        = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


//app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static('./public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.use(session({ secret: 'bbking' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
  if(err) {
    console.log("Error: Could not connect to Mongo");
  }
});

require('./config/passport')(passport);
require('./app/routes.js')(app, passport);



app.listen(port);
console.log('Server started: http://localhost:' + port + '/');
