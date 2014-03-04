var redis = require('../config/database').redis;
var User = require('../lib/User');
var mongoose = require('mongoose');
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
      loginUserWithCredentials(username, password, true, res);
    }
  });
}

function signinUser(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  loginUserWithCredentials(username, password, false, res);
}

function loginUserWithCredentials(username, password, firstTime, res) {
  User.authenticateUser(username, password, function(err, user) {
    var msg;
    if (err) {
      msg = firstTime ? 'Error signing up' : 'Error logging in';
      sendError(err, msg, res);
    } else {
      var token = mongoose.Types.ObjectId();
      redis.set(token, user._id);
      console.log('Token : ' + token);
      msg = firstTime ? 'User was signed up' : 'User was logged in';
      sendJSONResponse(res, {
        message: msg,
        token: token
      });
    }
  });
}

module.exports.registerUser = registerUser;
module.exports.signinUser = signinUser;
