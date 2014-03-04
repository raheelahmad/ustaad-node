var Card = require('../lib/Card');
var index = require('./index');
var sendError = index.sendError;
var sendJSONResponse = index.sendJSONResponse;

// --- CRUD routes

function showCards(req, res) {
  Card.findCards(req.userId, function(err, result) {
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
  Card.editCard(req.userId, id, rawCard, function(err, card) {
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
  Card.deleteCard(req.userId, id, function(err) {
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
  Card.createCard(req.userId, rawCard, function(err, card) {
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

module.exports.showCards = showCards;
module.exports.addCard = addCard;
module.exports.editCard = editCard;
module.exports.deleteCard = deleteCard;
