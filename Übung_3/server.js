var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));

// http://expressjs.com/starter/hello-world.html
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://%s:%s', host, port);
});


// Hello World Server
var helloWorldApp = express();
helloWorldApp.get('/', function(req, res){
    res.send('Hello World!');
});
var helloWorldServer = helloWorldApp.listen(8088, function() {
    var host = helloWorldServer.address().address;
    var port = helloWorldServer.address().port;
    console.log('Hello World server listening at http://%s:%s', host, port);
});
