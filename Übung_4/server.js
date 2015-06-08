var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var Books = require('./books');

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();


// parse Content-Type:application/json into JSON
app.use(bodyParser.json({ type: ['application/json', 'text/plain'] }))

// configure the router
router.route('/books/')
    .get(function(request, result) {
        // send all books
        result.send(Books.getAllBooks());
    })
    .post(function(request, result) {
        // check if there is any data parsed by bodyParser
        if(!_.isEmpty(request.body)) {
            // get what we need
            var pickedResults = _.pick(request.body, 'title', 'author', 'year');

            // send an JSON object containing the id back
            var newId = Books.addBook(pickedResults);
            result.send({_id: newId});
        }
        result.status(400).send();
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
