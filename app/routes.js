// app/routes.js
module.exports = function(app, passport) {

  var PasswordReset = require('../app/passwordReset.js');

	app.get('/', function(req, res) {
		res.sendfile('view/index.html');
	});

	app.get('/signup', function(req, res) {
		res.sendfile('view/signup.html');
	});

	app.get('/passwordReset', function(req, res) {
		res.sendfile('view/passwordReset.html');
	});

	app.get('/loginError', function(req,res){
		res.json({ message: "hello" });
	});

app.post('/login', function handleLocalAuthentication(req, res, next) {
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

app.post('/signup', function handleLocalAuthentication(req, res, next) {
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

app.post('/passwordReset', function(req, res) {
	PasswordReset.reset(req.body.pin,req.body.email,req.body.password, function(ret){
		res.json(ret);

	});
});

app.post('/getUserName', function(req, res) {
	console.log(req.user.local.displayName);
	res.json({username: req.user.local.displayName});
});

app.get('/profile', isLoggedIn, function(req, res) {
		res.sendfile('view/profile.html');
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
