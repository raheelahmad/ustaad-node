var Card = require('../lib/Card');

// --- CRUD routes

function showCards(req, res) {
  Card.findCards(function(err, result) {
    if (err) {
      sendError(err, 'Error finding cards', res);
    } else {
      var json = { 'cards' : result};
      sendJSONResponse(res, json);
    }
  });
}

function editCard(req, res) {
  var rawCard = req.body;
  var id = req.params.id;
  Card.editCard(id, rawCard, function(err, card) {
    if (err) {
      sendError(err, 'Error saving edited card ', res);
    } else {
      sendJSONResponse(res, {
        'message': 'Card edited',
        'card': card
      });
    }
  });
}

function deleteCard(req, res) {
  var id = req.params.id;
  console.log('Delete card');
  Card.deleteCard(id, function(err) {
    if (err) {
      sendError(err, 'Error deleting card for id ' + id + ': ' + err, res);
    } else {
      sendJSONResponse(res, {
        'message': 'Card deleted',
      });
    }
  });
}

function addCard(req, res) {
  var rawCard = req.body;
  Card.createCard(rawCard, function(err, card) {
    if (err) { sendError(err, 'Error creating the new card', res); return; }

    sendJSONResponse(res, {
      'message': 'Card created',
      'card': card
    });
  });
}

// --- Helpers

function idFromRequest(req) {
  return req.url.match(/^\/cards\/(.*)/)[1];
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

module.exports.showCards = showCards;
module.exports.addCard = addCard;
module.exports.editCard = editCard;
module.exports.deleteCard = deleteCard;
