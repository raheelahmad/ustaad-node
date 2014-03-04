var express = require('express');

var routes = require('./routes/index');
var user = require('./routes/user');
var cards = require('./routes/cards');
var db = require('./config/database.js');

var app = express();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Loading app in ' + process.env.NODE_ENV + ' mode. ');

// configuration
app.configure(function() {
  app.use(express.logger());
  app.use(routes.onlyWithToken);
  app.use(express.json());
  app.use(express.urlencoded());
});

// Route handlers
app.get('/cards', cards.showCards);
app.post('/cards', cards.addCard);
app.put('/cards/:id', cards.editCard);
app.delete('/cards/:id', cards.deleteCard);

app.post('/user', user.registerUser);
app.post('/login', user.signinUser);

app.use(function(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  message = err.message || 'Server error';
  response = JSON.stringify({message: message});
  if (res.statusCode === 0) {
    res.statusCode = 500;
  }
  res.send(response);
  console.log('Error: ' + err);
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

