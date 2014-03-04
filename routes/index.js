var redis = require('../config/database').redis;
module.exports.onlyWithToken = onlyWithToken;
module.exports.notFound = notFound;
module.exports.sendJSONResponse = sendJSONResponse;
module.exports.sendError = sendError;

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

function notFound(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  message = JSON.stringify({'message': 'Cannot process that request.'});
  res.end(message);
}

function sendJSONResponse(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  message = JSON.stringify(message);
  res.end(message);
}

function sendError(err, msg, res) {
  console.log(err);
  res.setHeader('Content-Type', 'application/json');
  if (err.statusCode) {
    res.statusCode = err.statusCode;
  } else {
    res.statusCode = 500;
  }
  if (err.message) {
    msg = msg + ': ' + err.message;
  }
  error = JSON.stringify({'error': msg});
  res.end(error);
}

