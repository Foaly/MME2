var port = 8080;

var express = require('express');
var app = express();

app.get('/*', function(request, result){
    result.sendFile(__dirname + "/public" + request._parsedUrl.path); // this is clearly a security hazard
});

app.listen(port);
console.log("Server running at http://127.0.0.1:" + port);
