var fs           = require('fs');
var path         = require('path');
var port         = process.env.PORT || 8080;
var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');

//var MongoClient  = require('mongodb').MongoClient;
var mongoose     = require('mongoose');
var request      = require('request');
var passport     = require('passport');
var flash        = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
//var bodyParser   = require('body-parser');
var session      = require('express-session');
var Grid         = require('gridfs-stream');
var checkSecure = function requireHTTPS(req, res, next) {
    if (!req.secure) {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
};


//app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static('app/public'));

app.use(checkSecure());
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParser());


app.use(session({ secret: 'bbking' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


mongoose.connect("mongodb://localhost:27017/test", function(err, db) {
  if(err) {
    console.log("Error: Could not connect to Mongo");
  }
});

var conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

app.set('gridfs', gfs);
console.log("GridFS Set");


require('./app/middlewares/passport')(passport);
require('./app/controllers/routes.js')(app, passport);



app.listen(port);
console.log('Server started: http://localhost:' + port + '/');
