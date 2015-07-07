var frisby = require('frisby');
var server = require('../server.js');

frisby.create('Try to connect without authentification')
    .get('http://localhost:8080/api/v1')
    .expectStatus(401)
    .toss();

frisby.create('Get v1 API without entity')
    .get('http://localhost:8080/api/v1')
    .auth('user', 'password')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'text/html; charset=utf-8')
    .expectBodyContains("Error! This server operates under /api/v1/.")
    .toss();

frisby.create('Get all books')
    .get('http://localhost:8080/api/v1/books')
    .auth('user', 'password')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONLength(4)
    .toss();

/* PAGINATION LIMIT */
frisby.create('Get one random book')
    .get('http://localhost:8080/api/v1/books?limit=1')
    .auth('user', 'password')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONLength(1)
    .afterJSON(function(json) {
        var oldBook = json;
        frisby.create('Get next random book')
            .get('http://localhost:8080/api/v1/books?limit=1&skip=1')
            .auth('user', 'password')
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .afterJSON(function(json) {
                expect(oldBook).not.toBe(json);
            })
            .toss();
    })
    .toss();

frisby.create('Get one book with wrong id')
    .get('http://localhost:8080/api/v1/books/1234')
    .auth('user', 'password')
    .expectStatus(400)
    .expectHeaderContains('content-type', 'text/html; charset=utf-8')
    .expectBodyContains("1234 is not a valid database id!")
    .toss();

frisby.create('Query search by name')
    .get('http://localhost:8080/api/v1/books?name=potter')
    .auth('user', 'password')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('*', {
        name: "Harry Potter and the Philosophers Stone",
        description : "The author is J.K.Rowling",
        ISBN: "1",
        state: 0
    })
    .toss();

frisby.create('Get all books with state 0')
    .get('http://localhost:8080/api/v1/books?state=0')
    .auth('user', 'password')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON('*', {
        state: 0 //expect all objects to have state of 0
    })
    .toss();

frisby.create('Insert book with wrong type object')
    .post('http://localhost:8080/api/v1/books', {
        WrongTitle: "The Martian",
        author: "Andy Weir",
        year: "2011"
    }, {
        json: true
    })
    .auth('user', 'password')
    .expectStatus(400)
    .expectBodyContains("Error malformated book object received.")
    .toss();

frisby.create('Insert book with number as ISBN')
    .post('http://localhost:8080/api/v1/books', {
        name: 'name as string',
        description: 'description as string',
        ISBN: 4815,
        state: 0
    }, {
        json: true
    })
    .auth('user', 'password')
    .expectStatus(400)
    .expectBodyContains("Error malformated book object received.")
    .toss();

frisby.create('Delete one book')
    .get('http://localhost:8080/api/v1/books?limit=1')
    .auth('user', 'password')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONLength(1)
    .afterJSON(function(json) {
        var bookId = json[0]._id;
        frisby.create('...actually delete it')
            .delete('http://localhost:8080/api/v1/books/' + bookId)
            .auth('user', 'password')
            .expectStatus(204)
            .after(function(err, res, body) {
                frisby.create('Try to delete same book again')
                    .delete('http://localhost:8080/api/v1/books/' + bookId)
                    .auth('user', 'password')
                    .expectStatus(404)
                    .expectJSON({
                        type: 'error',
                        statusCode: 404,
                        msg: 'Requested resource not found'
                    })
                    .toss();
            })
            .toss();
    })
    .toss();
