var express = require('express');
var app = express();

app.use(express.static('demo-app'));

var server = app.listen(8000, function() {
    console.log('Express server listening on port ' + server.address().port);
});
