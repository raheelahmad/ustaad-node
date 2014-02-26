var mongoose = require('mongoose'),
    creds = require('credential'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: {type: String, require: true, index: {unique: true}},
  passHash: {type: String, required:true}
});

var User = mongoose.model('User', UserSchema);

function registerUser(usr, pass, signedup) {
  creds.hash(pass, function(err, hash) {
    if (err) {
      signedup(err, null);
      return;
    }
    console.log('Store the pswd hash ', hash);

    User.findOne({username: usr}, function(err, user) {
      if (err || user !== null) {
        console.log('!!! Had an error ' + err);
        signedup(err, null);
        return;
      }

      user = new User();
      user.username = usr;
      user.passHash = hash;
      user.save(function(err) {
        if (err) {
          signedup(err, null);
        } else {
          console.log("Saved the user " + user);
          signedup(null, user);
        }
      });
    });
  });
}

function authenticateUser(username, pass, signedin) {
  User.findOne({username: username}, function(err, user) {
    if (user === null) {
      err = new Error('User name already exists');
    }
    if (err) {
      signedin(err, null);
      return;
    }

    creds.verify(user.passHash, pass, function(err, isValid) {
      if(!isValid) {
        err = new Error('Incorrect password!');
      }
      if (err) {
        signedin(err, null);
        return;
      }
      signedin(null, user);
    });
  });
}

module.exports.registerUser = registerUser;
module.exports.authenticateUser = authenticateUser;
