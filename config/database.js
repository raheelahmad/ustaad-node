var mongoose = require('mongoose');

var redisPort = process.env.REDISTOGO_URL || 'localhost';
var redisClient = require('redis-url').connect(redisPort);

function setupMongoose() {
  var uriString = process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URI ||
                  'mongodb://localhost/ustaad' + '_' + process.env.NODE_ENV;
  mongoose.connect(uriString, function(err, res) {
    if (err) {
      console.log('ERROR connecting to ' + uriString + '. ' + err);
    } else {
      console.log('Connected to mongoose at ' + uriString);
    }
  });
}

function setupRedis() {
}

function setup() {
  setupMongoose();
  setupRedis();
}

module.exports.setup = setup;
module.exports.redis = redisClient;

