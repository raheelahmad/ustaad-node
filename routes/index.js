var redis = require('../config/database').redis;
module.exports.onlyWithToken = onlyWithToken;
module.exports.sendJSONResponse = sendJSONResponse;

function onlyWithToken(req, res, next) {
  var routesWithoutAuth = [ '/user', '/login' ];
  var path = req.path;

  if (routesWithoutAuth.indexOf(path) !== -1) {
    return next();
  }

  var authHeader = req.headers.authorization;
  if (!authHeader) {
    err = new Error();
    err.message = 'Unauthorized';
    res.statusCode = 401;
    return next(err);
  }
  var authToken = authHeader;
  console.log('Will get authToken');
  redis.get(authToken, function(err, userId) {
    console.log('Found user id: ' + userId);
    if (err) {
      return next(err);
    } else if (!userId) {
      err = new Error();
      err.message = "Unauthorized";
      err.statusCode = 401;
      return next(err);
    }
    req.userId = userId;
    console.log('Sending user id: ' + userId);
    next();
  });
}

function sendJSONResponse(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  message = JSON.stringify(message);
  res.end(message);
}
