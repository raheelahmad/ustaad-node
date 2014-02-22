var mongoose = require('mongoose');

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

module.exports.setup = setupMongoose;

