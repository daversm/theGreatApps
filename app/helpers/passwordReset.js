var User = require('../models/user');

module.exports = {

  reset: function(pin,email,password,res){
    User.findOne({ 'local.email' :  email, 'local.pin' : pin}, function(err, user) {
        if (err)
            res({error:'true', message:' - server error'});
        else if (!user) {
            res({error:'true', message:' - email or pin incorrect'});
        } else {
            user.local.password = user.generateHash(password);

            user.save(function(err) {
                if (err){
                  res({error:'true', message:' - server error'});
                }
                console.log("newPass: " + password + " " + user.generateHash(password) );
                res({error:'false', message:' password updated'});
            });
        }
    });
  }
};
