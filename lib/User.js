var mongoose = require('mongoose'),
    creds = require('credential'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: {type: String, require: true, index: {unique: true}},
  pasHash: {type: String, required:true}
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
        signedup(err, null);
        return;
      }

      user = new User();
      user.username = usr;
      user.passHash = hash;
      signedup(null, user);
    });
  });
}

module.exports.registerUser = registerUser;
