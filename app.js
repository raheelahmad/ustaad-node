var http = require('http');
var mongoose = require('mongoose');

var routes = require('./routes');
var cards = require('./routes/cards');

function setupMongoose() {
  var uriString = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URI ||
                  'mongodb://localhost/ustaad';
  mongoose.connect(uriString, function(err, res) {
    if (err) { console.log('ERROR connecting to ' + uriString + 
                          '. ' + err);
    } else {
      console.log('Connected to mongoose at ' + uriString);
    }
  });
}

var server = http.createServer( function(req, res) {
  console.log(req.url);
  if (req.url === '/cards' && req.method == 'GET') {
    cards.showCards(req, res);
  } else if (req.url === '/cards' && req.method == 'POST') {
    cards.addCard(req, res);
  } else {
    routes.notFound(req, res);
  }
});

var port = Number(process.env.PORT || 3100);
server.listen(port, function() {
  console.log('listening on ' + port);
  setupMongoose();
});

