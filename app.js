var http = require('http');

var server = http.createServer( function(req, res) {
  console.log(req.url);
  res.end('Done');
});

port = process.env.PORT_NUM || 3100;
server.listen(port, function() {
  console.log('listening on ' + port);
});

