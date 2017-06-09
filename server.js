var express = require('express');
var compression = require('compression');

var app = express();

app.use(compression());
app.use(express.static('public'));

const port = 9080;

app.listen(port, function (err) {
  if (err) throw err;

  console.log('RE:DOM dev running, browse to http://localhost:' + port);
});
