var mongoose = require('mongoose');

var redisClient = require('redis-url');

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
  var redisPort = process.env.REDISTOGO_URL || 'localhost';
  redisClient.connect(redisPort);
  console.log('Listening to redis on ' + redisPort);
}

function setup() {
  setupMongoose();
  setupRedis();
}

module.exports.setup = setup;
module.exports.redis = redisClient;

