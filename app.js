var express = require('express');

var user = require('./routes/user');
var cards = require('./routes/cards');
var db = require('./config/database.js');

var app = express();

// configuration
app.configure(function() {
  app.use(express.logger());
  app.use(express.json());
  app.use(express.urlencoded());
});

// Route handlers
app.get('/cards', cards.showCards);
app.post('/cards', cards.addCard);
app.put('/cards/:id', cards.editCard);
app.delete('/cards/:id', cards.deleteCard);

app.post('/user', user.registerUser);

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  message = JSON.stringify({message: 'Not a valid path'});
  res.send(404, message);
});

var port = process.env.PORT || 3100;
app.listen(port, function() {
  console.log('listening on ' + port);
  db.setup();
});


/**
var server = http.createServer( function(req, res) {
  var method = req.method.toLowerCase();
  console.log(method + ' ' + req.url);
  if (req.url === '/cards' && method == 'get') {
    cards.showCards(req, res);
  } else if (req.url === '/cards' && method == 'post') {
    cards.addCard(req, res);
  } else if (isCardIdRequest(req) && method == 'put') {
    cards.editCard(req, res);
  } else if (isCardIdRequest(req) && method == 'delete') {
    cards.deleteCard(req, res);
  } else {
    routes.notFound(req, res);
  }
});
*/

// --- Helpers

function isCardIdRequest(req) {
  return req.url.match(/^\/cards\/(.*)/);
}

