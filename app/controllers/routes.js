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

app.post('/signup', bodyParser(), function handleLocalAuthentication(req, res, next) {
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
app.post('/deleteAProject', bodyParser(), isLoggedIn, function(req, res) {

  var projects = JSON.parse(req.user.local.projects);
  var id = req.body.id;

  function handleError(){
    res.json({error:true});
  }
  if(projects[id].trackOne.R !== ""){
    gfs.remove({_id:new mongoose.Types.ObjectId(projects[id].trackOne.R)}, function (err) {
      if (err) return handleError(err);
      console.log('Deleted file id:' + projects[id].trackOne.R);


    });
  }
  if(projects[id].trackOne.L !== ""){
    gfs.remove({_id:new mongoose.Types.ObjectId(projects[id].trackOne.L)}, function (err) {
      if (err) return handleError(err);
      console.log('Deleted file id:' + projects[id].trackOne.L);
    });
  }


  if(projects[id].trackTwo.R !== ""){
    gfs.remove({_id:new mongoose.Types.ObjectId(projects[id].trackTwo.R)}, function (err) {
      if (err) return handleError(err);
      console.log('Deleted file id:' + projects[id].trackTwo.R);


    });
  }
  if(projects[id].trackTwo.L !== ""){
    gfs.remove({_id:new mongoose.Types.ObjectId(projects[id].trackTwo.L)}, function (err) {
      if (err) return handleError(err);
      console.log('Deleted file id:' + projects[id].trackTwo.L);
    });
  }


  if(projects[id].trackThree.R !== ""){
    gfs.remove({_id:new mongoose.Types.ObjectId(projects[id].trackThree.R)}, function (err) {
      if (err) return handleError(err);
      console.log('Deleted file id:' + projects[id].trackThree.R);


    });
  }
  if(projects[id].trackThree.L !== ""){
    gfs.remove({_id:new mongoose.Types.ObjectId(projects[id].trackThree.L)}, function (err) {
      if (err) return handleError(err);
      console.log('Deleted file id:' + projects[id].trackThree.L);
    });
  }


  res.json({error: false});

});

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

app.post('/uploadTrackOneR', function(req, res) {

  var id = new mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({_id:id});
  req.pipe(writestream);

  req.on('end', function() {

    var projects = JSON.parse(req.user.local.projects);
    projects[req.user.local.currentProject].trackOne.R = id;
    req.user.local.projects = JSON.stringify(projects);

    req.user.save(function(err) {
        if (err){
          console.log(err);
          res.json({error:true});

        }else{
          console.log("User projects Updated");
          res.json({error:false});
        }
    });

  });

});

app.post('/uploadTrackOneL', function(req, res) {

  var id = new mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({_id:id});
  req.pipe(writestream);

  req.on('end', function() {
    var projects = JSON.parse(req.user.local.projects);
    projects[req.user.local.currentProject].trackOne.L = id;
    req.user.local.projects = JSON.stringify(projects);

    req.user.save(function(err) {
        if (err){
          console.log(err);
          res.json({error:true});

        }else{
          console.log("User projects Updated");
          res.json({error:false});
        }
    });

  });

});

app.post('/uploadTrackTwoR', function(req, res) {

  var id = new mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({_id:id});
  req.pipe(writestream);

  req.on('end', function() {
    var projects = JSON.parse(req.user.local.projects);
    projects[req.user.local.currentProject].trackTwo.R = id;
    req.user.local.projects = JSON.stringify(projects);

    req.user.save(function(err) {
        if (err){
          console.log(err);
          res.json({error:true});

        }else{
          console.log("User projects Updated");
          res.json({error:false});
        }
    });

  });

});

app.post('/uploadTrackTwoL', function(req, res) {

  var id = new mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({_id:id});
  req.pipe(writestream);

  req.on('end', function() {
    var projects = JSON.parse(req.user.local.projects);
    projects[req.user.local.currentProject].trackTwo.L = id;
    req.user.local.projects = JSON.stringify(projects);

    req.user.save(function(err) {
        if (err){
          console.log(err);
          res.json({error:true});

        }else{
          console.log("User projects Updated");
          res.json({error:false});
        }
    });

  });

});
app.post('/uploadTrackThreeR', function(req, res) {

  var id = new mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({_id:id});
  req.pipe(writestream);

  req.on('end', function() {
    var projects = JSON.parse(req.user.local.projects);
    projects[req.user.local.currentProject].trackThree.R = id;
    req.user.local.projects = JSON.stringify(projects);

    req.user.save(function(err) {
        if (err){
          console.log(err);
          res.json({error:true});

        }else{
          console.log("User projects Updated");
          res.json({error:false});
        }
    });

  });

});

app.post('/uploadTrackThreeL', function(req, res) {

  var id = new mongoose.Types.ObjectId();
  var writestream = gfs.createWriteStream({_id:id});
  req.pipe(writestream);

  req.on('end', function() {
    var projects = JSON.parse(req.user.local.projects);
    projects[req.user.local.currentProject].trackThree.L = id;
    req.user.local.projects = JSON.stringify(projects);

    req.user.save(function(err) {
        if (err){
          console.log(err);
          res.json({error:true});

        }else{
          console.log("User projects Updated");
          res.json({error:false});
        }
    });

  });

});

app.get('/downloadTrackOneR', function(req, res) {
    var projects = JSON.parse(req.user.local.projects);
    id = projects[req.user.local.currentProject].trackOne.R;
    if(id === ""){
      res.status(500).send('Something broke!');
      return;
    }
    var file = gfs.createReadStream({_id:id});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending T1R");
});
app.get('/downloadTrackOneL', function(req, res) {
    var projects = JSON.parse(req.user.local.projects);
    id = projects[req.user.local.currentProject].trackOne.L;
    console.log("the track ID was:" + id);
    if(id === ""){
      res.status(500).send('Something broke!');
      return;
    }

    var file = gfs.createReadStream({_id:id});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending T1L");
});

app.get('/downloadTrackTwoR', function(req, res) {
    var projects = JSON.parse(req.user.local.projects);
    id = projects[req.user.local.currentProject].trackTwo.R;
    if(id === ""){
      res.status(500).send('Something broke!');
      return;
    }

    var file = gfs.createReadStream({_id:id});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending T2R");
});
app.get('/downloadTrackTwoL', function(req, res) {
    var projects = JSON.parse(req.user.local.projects);
    id = projects[req.user.local.currentProject].trackTwo.L;
    if(id === ""){
      res.status(500).send('Something broke!');
      return;
    }

    var file = gfs.createReadStream({_id:id});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending T2L");
});

app.get('/downloadTrackThreeR', function(req, res) {
    var projects = JSON.parse(req.user.local.projects);
    id = projects[req.user.local.currentProject].trackThree.R;
    if(id === ""){
      res.status(500).send('Something broke!');
      return;
    }

    var file = gfs.createReadStream({_id:id});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending T3R");
});
app.get('/downloadTrackThreeL', function(req, res) {
    var projects = JSON.parse(req.user.local.projects);
    id = projects[req.user.local.currentProject].trackThree.L;
    if(id === ""){
      res.status(500).send('Something broke!');
      return;
    }

    var file = gfs.createReadStream({_id:id});
    res.set({'Content-Type': 'arraybuffer'});
    file.pipe(res);
    console.log("doneSending T3L");
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
