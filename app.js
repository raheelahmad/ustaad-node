var express = require('express');
var mongoose = require('mongoose');

var routes = require('./routes');
var cards = require('./routes/cards');

function setupMongoose() {
  var uriString = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URI ||
                  'mongodb://localhost/ustaad';
  mongoose.connect(uriString, function(err, res) {
    if (err) {
      console.log('ERROR connecting to ' + uriString + '. ' + err);
    } else {
      console.log('Connected to mongoose at ' + uriString);
    }
  });
}

var app = express();

// configuration
app.use(express.json());
app.use(express.urlencoded());

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  message = JSON.stringify({message: 'Not a valid path'});
  res.send(404, message);
});

app.get('/cards', cards.showCards);
app.post('/cards', cards.addCard);
app.put('/cards/:id', cards.editCard);

var port = process.env.PORT || 3100;
app.listen(port, function() {
  console.log('listening on ' + port);
  setupMongoose();
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

