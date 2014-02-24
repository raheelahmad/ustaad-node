module.exports.notFound = notFound;
module.exports.sendJSONResponse = sendJSONResponse;
module.exports.sendError = sendError;

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
  res.statusCode = 500;
  error = JSON.stringify({'error': msg});
  res.end(error);
}

