var mongoose = require('mongoose');

var cardSchema = new mongoose.Schema({
  title: String,
  frontText: String,
  backText: String
});

var Card = mongoose.model('Cards', cardSchema);

module.exports = Card;

