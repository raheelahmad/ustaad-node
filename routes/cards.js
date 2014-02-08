var Card = require('../lib/Card');

function sendError(msg, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 500;
  error = JSON.stringify({'error': msg});
  res.end(error);
}

function showCards(req, res) {
  Card.find({}).exec(function(err, result) {
    if (err) {
      sendError('Error finding cards', res);
      return;
    }
    json = { 'cards' : result};
    sendJSONResponse(res, json);
  });
}

function editCard(req, res) {
  cardFromRequest(req, function(rawCard) {
    var id = idFromRequest(req);
    Card.findById(id).exec(function(err, result) {
      var card = result;
      if (err) {
        sendError('Error finding card for id ' + err, res);
        return;
      }
      if (rawCard.title) { card.title = rawCard.title; }
      if (rawCard.frontText) { card.frontText = rawCard.frontText; }
      if (rawCard.backText) { card.backText = rawCard.backText; }
      card.save(function(err) {
        if (err) {
          sendError('Error saving edited card ', res);
          return;
        }
        sendJSONResponse(res, {
          'message': 'Card edited',
          'card': card
        });
      });
    });
  });
}

function deleteCard(req, res) {
  var id = idFromRequest(req);
  console.log('Delete card');
  Card.findById(id).exec(function(err, card) {
    card.remove(function(err, card) {
      if (err) { 
        sendError('Error deleting card for id ' + id + ': ' + error, res); 
        return;
      }
      sendJSONResponse(res, {
        'message': 'Card deleted',
      });
    })
  })
}

function addCard(req, res) {
  cardFromRequest(req, function(rawCard){
    var card = new Card();
    card.title = rawCard.title;
    card.frontText = rawCard.frontText;
    card.backText = rawCard.backText;
    card.save(function (err) {
      if (err) { sendError('Error creating the new card', res); return; }

      sendJSONResponse(res, {
                'message': 'Card created',
                'card': card
      });
    });
  });
}

// --- Helpers

function cardFromRequest(req, fn) {
  req.setEncoding('utf8');
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    var rawCard;
    try {
      rawCard = JSON.parse(body);
    } catch (er) {
      res.statusCode = 400;
      sendError('Error parsing the new card JSON', res);
    }
    fn(rawCard);
  });
}

function idFromRequest(req) {
  return req.url.match(/^\/cards\/(.*)/)[1];
}

function sendJSONResponse(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  message = JSON.stringify(message);
  res.end(message);
}

module.exports.showCards = showCards;
module.exports.addCard = addCard;
module.exports.editCard = editCard;
module.exports.deleteCard = deleteCard;
