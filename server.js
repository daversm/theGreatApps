var fs           = require('fs');
var path         = require('path');
var port         = process.env.PORT || 8080;
var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var useragent    = require('express-useragent');

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

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('ssl-key.pem', 'utf8');
var certificate = fs.readFileSync('ssl-cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};

app.use("/public", express.static('app/public'));

function requireHTTPS(req, res, next) {
    if (!req.secure) {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
};

function isChrome(req, res, next) {
    var browserName = req.useragent["browser"];
    var browserVersion = req.useragent["version"]

    if (browserName !== 'Chrome' && browserVersion !>= 47){
      res.sendFile('app/views/noSupport.html');
    }
    else{
      next();
    }
};


app.use(requireHTTPS);
app.use(isChrome);
app.use(morgan('dev'));
app.use(cookieParser());

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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80, function(){
  console.log('Server started: Port 80');
});
httpsServer.listen(443, function(){
  console.log('Server started: Port 443');
});
