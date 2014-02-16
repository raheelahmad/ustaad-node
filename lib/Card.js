var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  title: String,
  frontText: String,
  backText: String,
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
});

var Card = mongoose.model('Cards', cardSchema);

function createCard(rawCard, fn) {
  var card = new Card();
  card.title = rawCard.title;
  card.frontText = rawCard.frontText;
  card.backText = rawCard.backText;
  card.save(function (err) {
    fn(err, card);
  });
}

function deleteCard(id, fn) {
  Card.findById(id).exec(function(err, card) {
    if (err) {
      fn(err);
      return;
    }
    card.remove(function(err, card) {
      if (err) {
        fn(err);
        return;
      }
      fn(null);
    });
  });

}

function editCard(id, rawCard, fn) {
  Card.findById(id).exec(function(err, result) {
    var card = result;
    if (err) {
      fn(err, null);
      return;
    }
    if (rawCard.title) { card.title = rawCard.title; }
    if (rawCard.frontText) { card.frontText = rawCard.frontText; }
    if (rawCard.backText) { card.backText = rawCard.backText; }
    if (rawCard.modifiedAt) {
      card.modifiedAt = rawCard.modifiedAt;
    } else {
      card.modifiedAt = Date.now;
    }
    card.save(function(err) {
      fn(err, card);
    });
  });
}

function findCards(fn) {
  Card.find({}).exec(fn);
}

module.exports.createCard = createCard;
module.exports.deleteCard = deleteCard;
module.exports.editCard = editCard;
module.exports.findCards = findCards;
