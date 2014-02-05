function showCards(req, res) {
  res.end('Here all the cards!');
}

function addCard(req, res) {
  res.end('Adding to cards!');
}

module.exports.showCards = showCards;
module.exports.addCard = addCard;
