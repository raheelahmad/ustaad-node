var User = require('../lib/User');
var index = require('./index');
var sendError = index.sendError;
var sendJSONResponse = index.sendJSONResponse;

function registerUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.registerUser(username, password, function(err, user) {
    if (err) {
      sendError(err, 'Error signing up', res);
    } else {
      sendJSONResponse(res, {
        message: 'User was signed up',
      });
    }
  });
}

module.exports.registerUser = registerUser;
