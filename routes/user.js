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

function signinUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.authenticateUser(username, password, function(err, token) {
    if (err) {
      sendError(err, 'Error signing in', res);
    } else {
      sendJSONResponse(res, {
        message: 'User was signed in',
        token: token
      });
    }
  });
}

module.exports.registerUser = registerUser;
module.exports.signinUser = signinUser;
