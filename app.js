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

// GET catch all
app.get('*', function(req, res, next) {
  lastRouteHandler(next, 'GET');
})

app.post('*', function(req, res, next) {
  lastRouteHandler(next, 'POST');
});

function lastRouteHandler(next, method) {
  var err = new Error();
  err.statusCode = 404;
  err.message = 'Could not ' + method + req.route.path;
  next(err);
}

app.use(function(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var message = err.message || 'Server error';
  var response = JSON.stringify({message: message});
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
