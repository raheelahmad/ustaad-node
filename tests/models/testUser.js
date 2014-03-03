var User = require('../../lib/User');
var assert = require('assert');

describe('User', function() {
  it('hashes the user\'s password', function(done) {
    var user = new User.User();
    user.username = 'Raheel Tester';
    user.passHash = 'som3h3sH';
    user.save(function(err) {
      console.log('Saved');
      done();
    });
  });
});
