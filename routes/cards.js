var Card = require('../lib/Card');

function sendError(msg) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  error = JSON.stringify({'error': msg});
  res.end(error);
}

function showCards(req, res) {
  var myCard = new Card({
    title: 'What is node?',
    frontText: 'Can you tell me what node is?',
    backText: 'It is the new hotness.'
  });
  myCard.save(function (err) {
    if (err) {
      sendError('Could not save new Card');
      return;
    }
    Card.find({}).exec(function(err, result) {
      if (err) {
        sendError('Error finding cards');
        return;
      }
      message = "Created: " + result;
      json = { 'message' : message};
      sendJSONResponse(res, json);
    });
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
