// app/routes.js
module.exports = function(app, passport) {

  var PasswordReset = require('../helpers/passwordReset.js');
  var fs      = require('fs');
  var path = require('path');
  var gfs = app.get('gridfs');
  var mongoose     = require('mongoose');
  var bodyParser   = require('body-parser');


	app.get('/', function(req, res) {
		res.sendfile('app/views/index.html');
	});

  app.get('/daw',isLoggedIn, function(req, res) {
		res.sendfile('app/views/daw.html');
	});

	app.get('/signup', function(req, res) {
		res.sendfile('app/views/signup.html');
	});

  app.get('/demo', function(req, res) {
		res.sendfile('app/views/demo.html');
	});

	app.get('/passwordReset', function(req, res) {
		res.sendfile('app/views/passwordReset.html');
	});

	app.get('/loginError', function(req,res){
		res.json({ message: "hello" });
	});

app.post('/login', bodyParser(), function handleLocalAuthentication(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.json({
                redirect: "false",
								message: " - password or username incorrect"
            });
        }

        // Manually establish the session...
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json({redirect:"true"});
        });

    })(req, res, next);
});

app.post('/signup',bodyParser(), function handleLocalAuthentication(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
				if (err) return next(err);
				if (!user) {
						return res.json({
								redirect: "false",
								message: " - email already in use"
						});
				}

				// Manually establish the session...
				req.login(user, function(err) {
						if (err) return next(err);
						return res.json({redirect:"true"});
				});

		})(req, res, next);
});

app.post('/passwordReset',bodyParser(), function(req, res) {
	PasswordReset.reset(req.body.pin,req.body.email,req.body.password, function(ret){
		res.json(ret);

	});
});

app.post('/getUserInfo',bodyParser(),isLoggedIn, function(req, res) {
	  res.json({username: req.user.local.displayName, projects:req.user.local.projects});

});
app.post('/getProjectID',bodyParser(), isLoggedIn, function(req, res){
    res.json({projectID: req.user.local.currentProject});
});

app.post('/loadProject',bodyParser(), isLoggedIn, function(req, res) {
    req.user.local.currentProject = req.body.project;
    req.user.save(function(err) {
        if (err){
          res.json({error:true});

        }else{
          res.json({error:false});
        }
    });
});
app.post

app.post('/updateProjects', bodyParser(), isLoggedIn, function(req, res) {

  req.user.local.projects = req.body.projects;

  req.user.save(function(err) {
      if (err){
        console.log(err);
        res.json({projects: req.user.local.projects, error:true});

      }else{
        console.log("User projects Updated");
        res.json({projects:req.user.local.projects, error:false});
      }
  });

});

app.get('/profile',bodyParser(), isLoggedIn, function(req, res) {
		res.sendfile('app/views/profileProject.html');
});

app.post('/uploadTrackOne', function(req, res) {

  var writestream = gfs.createWriteStream({filename:"oknow3"});
  req.pipe(writestream);

  function createFile(){

  var wstream = fs.createWriteStream('data.dat');
  var writestream = gfs.createWriteStream({filename:"oknow2"});

  wstream.write(data);
  wstream.end();
  var readBuffer = fs.createReadStream('data.dat');
  readBuffer.pipe(writestream);
}







  /*
  var id = mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({filename:"new", id:id});
  //emitter.setMaxListeners(0);
  req.on('readable', function(){
    //console.log(req.read());
    console.log(req.body);

  });
  */
   /*
   var tempfile    = req.files[0].path;
   console.log(temp)

   var writestream = gfs.createWriteStream({filename:"hi"});
   //req.user.local.projects[0].trackOneUrl = id;
   // open a stream to the temporary file created by Express...
   fs.createReadStream(req.body.buffers)
     .on('end', function() {
       res.send('OK');
     })
     .on('error', function() {
       res.send('ERR');
     })
     // and pipe it to gfs
     .pipe(writestream);
     */
});

app.get('/download', function(req, res) {
    var file = gfs.createReadStream({filename:'oknow3'});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending");
  });

app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};


function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
