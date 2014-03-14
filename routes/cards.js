var Card = require('../lib/Card');
var index = require('./index');
var sendJSONResponse = index.sendJSONResponse;

// --- CRUD routes

function showCards(req, res) {
  Card.findCards(req.userId, function(err, result) {
    if (err) {
      err.message = 'Error finding cards';
      next(err);
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
      err.message = 'Error saving edited card ';
      next(err);
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
      err.message = 'Error deleting card for id ' + id;
      next(err);
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
    if (err) {
      err.message = 'Error creating the new card';
      next(err);
    } else {
      sendJSONResponse(res, {
        'message': 'Card created',
        'card': card
      });
    }
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
