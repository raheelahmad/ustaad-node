var redis = require('../config/database').redis;
var User = require('../lib/User');
var mongoose = require('mongoose');
var index = require('./index');
var sendJSONResponse = index.sendJSONResponse;

function registerUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  User.registerUser(username, password, function(err, user) {
    if (err) {
      err.message = 'Error registering user' + err.message;
      err.statusCode = 401;
      next(err);
    } else {
      loginUserWithCredentials(username, password, true, res);
    }
  });
}

function signinUser(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  loginUserWithCredentials(username, password, false, res, next);
}

function loginUserWithCredentials(username, password, firstTime, res, next) {
  User.authenticateUser(username, password, function(err, user) {
    if (err) {
      var message = firstTime ? 'Error signing up. ' : 'Error logging in. ';
      err.message = message + err.message;
      err.statusCode = 401;
      next(err);
    } else {
      var token = mongoose.Types.ObjectId();
      redis.set(token, user._id);
      console.log('Token : ' + token);
      var msg = firstTime ? 'User was signed up' : 'User was logged in';
      sendJSONResponse(res, {
        message: msg,
        token: token
      });
    }
  });
}

module.exports.registerUser = registerUser;
module.exports.signinUser = signinUser;
