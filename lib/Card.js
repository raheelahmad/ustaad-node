var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  title: String,
  userId: String,
  frontText: String,
  backText: String,
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
});

var Card = mongoose.model('Cards', cardSchema);

function createCard(userId, rawCard, fn) {
  var card = new Card();
  card.title = rawCard.title;
  card.frontText = rawCard.frontText;
  card.backText = rawCard.backText;
  card.userId = userId;
  card.save(function (err) {
    fn(err, card);
  });
}

function deleteCard(userId, id, fn) {
  Card.findById(id).exec(function(err, card) {
    if (err) {
      fn(err);
      return;
    } else if (card === null) {
      fn('No card with that id');
      return;
    } else if (card.userId !== userId) {
      fn('Unauthorized');
      return;
    }
    card.remove(function(err, card) {
      fn(err);
    });
  });

}

function editCard(userId, id, rawCard, fn) {
  Card.findById(id).exec(function(err, card) {
    if (err) {
      fn(err, null);
      return;
    } else if (card === null) {
      fn('No card with that id');
      return;
    } else if (card.userId !== userId) {
      fn('Unauthorized');
      return;
    }

    if (rawCard.title) { card.title = rawCard.title; }
    if (rawCard.frontText) { card.frontText = rawCard.frontText; }
    if (rawCard.backText) { card.backText = rawCard.backText; }
    if (rawCard.modifiedAt) {
      card.modifiedAt = rawCard.modifiedAt;
    } else {
      card.modifiedAt = new Date();
    }
    card.save(function(err) {
      fn(err, card);
    });
  });
}

function findCards(userId, fn) {
  Card.find({ userId: userId }).exec(fn);
}

module.exports.createCard = createCard;
module.exports.deleteCard = deleteCard;
module.exports.editCard = editCard;
module.exports.findCards = findCards;
