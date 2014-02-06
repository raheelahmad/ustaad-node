var Card = require('../lib/Card');

function sendError(msg) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  error = JSON.stringify({'error': msg});
  res.end(error);
}

function showCards(req, res) {
  Card.find({}).exec(function(err, result) {
    if (err) {
      sendError('Error finding cards');
      return;
    }
    json = { 'cards' : result};
    sendJSONResponse(res, json);
  });
}

function addCard(req, res) {
  message = {'message': 'Adding to cards!'};
  sendJSONResponse(res, message);
}

function sendJSONResponse(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  message = JSON.stringify(message);
  res.end(message);
}

module.exports.showCards = showCards;
module.exports.addCard = addCard;
