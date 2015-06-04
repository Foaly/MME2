var express = require('express');
var Books = require('./books');

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

router.route('/books/')
    .get(function(request, result) {
        // send all books
        result.send(Books.getAllBooks());
    });

router.route('/books/:id')
    .get(function(request, result) {
        var book = Books.getBookById(request.params.id);

        if(book === undefined) {
            console.log("Error: Book not found");
        }
        else {
            result.send(book);
        }
    })
    .post(function(request, result) {

    });

// Only route requests to /api/v1/* to the router middleware
app.use('/api/v1', router);

//default route
app.use(function(request, result) {
    result.status(404).send("Error! This server operates under /api/v1/.");
});

// start server
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://%s:%s', host, port);
});
