var port = 8080;

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

// http://expressjs.com/starter/hello-world.html
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://%s:%s', host, port);
});


// Hello World Server
/*app.get('/', function(req, res){
    res.send('Hello World!');
});
app.listen(8080);
*/