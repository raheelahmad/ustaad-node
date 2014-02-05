var http = require('http');

function showCards(req, res) {
  res.end('Here all the cards!');
}

function addCard(req, res) {
  res.end('Adding to cards!');
}

function notFound(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 404;
  message = JSON.stringify({'message': 'Cannot process that request.'});
  res.end(message);
}

var server = http.createServer( function(req, res) {
  console.log(req.url);
  if (req.url === '/cards' && req.method == 'GET') {
    showCards(req, res);
  } else if (req.url === '/cards' && req.method == 'POST') {
    addCard(req, res);
  } else {
    notFound(req, res);
  }
});

port = process.env.PORT_NUM || 3100;
server.listen(port, function() {
  console.log('listening on ' + port);
});

