function showCards(req, res) {
  message = { 'message' : 'Here all the cards!' };
  sendJSONResponse(res, message);
}

function addCard(req, res) {
  message = {'message': 'Adding to cards!'};
  sendJSONResponse(res, message);
}

function sendJSONResponse(res, message) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  message = JSON.stringify(message);
  res.end(message);
}

module.exports.showCards = showCards;
module.exports.addCard = addCard;
