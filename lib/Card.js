var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  title: String,
  frontText: String,
  backText: String,
  createdAt: {type: Date, default: Date.now},
  modifiedAt: {type: Date, default: Date.now}
});

var Card = mongoose.model('Cards', cardSchema);

module.exports = Card;

