var http = require('http');
var cards = require('./routes/cards');

function notFound(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  message = JSON.stringify({'message': 'Cannot process that request.'});
  res.end(message);
}

var server = http.createServer( function(req, res) {
  console.log(req.url);
  console.log(req.headers);
  if (req.url === '/cards' && req.method == 'GET') {
    cards.showCards(req, res);
  } else if (req.url === '/cards' && req.method == 'POST') {
    cards.addCard(req, res);
  } else {
    notFound(req, res);
  }
});

var port = Number(process.env.PORT || 3100);
server.listen(port, function() {
  console.log('listening on ' + port);
});

