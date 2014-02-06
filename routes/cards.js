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
  req.setEncoding('utf8');
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function(){
    var rawCard;
    try {
      rawCard = JSON.parse(body);
    } catch (er) {
      res.statusCode = 400;
      sendError('Error parsing the new card JSON');
    }
    var card = new Card();
    card.title = rawCard.title;
    card.frontText = rawCard.frontText;
    card.backText = rawCard.backText;
    card.save(function (err) {
      if (err) { sendError('Error creating the new card'); return; }

      sendJSONResponse(res, {'message': 'Card created'});
    });
  });
}

function sendJSONResponse(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  message = JSON.stringify(message);
  res.end(message);
}

module.exports.showCards = showCards;
module.exports.addCard = addCard;
