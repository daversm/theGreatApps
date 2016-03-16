
var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });



    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },

    function(req, email, password, done) {
      console.log("In SignUP" + " email:" + email + " password:" + password + " display:" + req.body.displayName + " pin:" + req.body.pin);

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                var newUser               = new User();

                newUser.local.email       = email;
                newUser.local.displayName = req.body.displayName;
                newUser.local.pin         = req.body.pin;
                newUser.local.password    = newUser.generateHash(password);
                newUser.local.projects    = JSON.stringify({});

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));



    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log("In SignIn" + " email:" + email + " password:" + password);

        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            return done(null, user);
        });

    }));

};
