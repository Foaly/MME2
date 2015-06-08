var frisby = require('frisby');
var server = require('../server.js');

var originalArray = [{title: "Harry Potter and the Philosophers Stone", author: "J.K.Rowling", year: ""},
                     {title: "The Lord Of The Rings", author: "J.R.R.Tolken", year: ""},
                     {title: "Eragon", author: "", year: ""},
                     {title: "Bartimäus", author: "", year: ""}];

var errorJSON = {type: "error",
                 statusCode: 404,
                 msg: "Requested resource not found"};


/*
* Get
*/
frisby.create('Get all')
  .get('http://localhost:8080/api/v1/books')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(originalArray)
.toss();

frisby.create('Get one book')
  .get('http://localhost:8080/api/v1/books/1')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(originalArray[1])
.toss();

frisby.create('Get one book error')
  .get('http://localhost:8080/api/v1/books/4')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(errorJSON)
.toss();

/*
 * Put
 */
var newBook = {title: "Harry Potter and the Chamber Of Secrets", author: "J.K.Rowling", year: ""};
frisby.create('Update a book')
  .put('http://localhost:8080/api/v1/books/0', newBook, {json: true})
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON(newBook)
.toss();

frisby.create('Update a book error')
  .put('http://localhost:8080/api/v1/books/4', newBook, {json: true})
  .expectStatus(404)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON(errorJSON)
.toss();

/*
 * Post
 */
frisby.create('Add a book')
  .post('http://localhost:8080/api/v1/books', newBook, {json: true})
  .expectStatus(201)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectHeaderContains('location', '/books/4')
  .expectJSON({_id: 4})
.toss();

frisby.create('Add a book error')
  .post('http://localhost:8080/api/v1/books')
  .expectStatus(400)
  .expectBodyContains('')
.toss();

frisby.create('Add another book')
  .post('http://localhost:8080/api/v1/books', newBook, {json: true})
  .expectStatus(201)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectHeaderContains('location', '/books/5')
  .expectJSON({_id: 5})
.toss();

/*
 * Delete
 */
frisby.create('Delete a book')
  .delete('http://localhost:8080/api/v1/books/4')
  .expectStatus(204)
  .expectBodyContains('')
.toss();

var newArray = originalArray.slice();
newArray[0] = newBook;
newArray.push(newBook);
frisby.create('Check array after deletion')
  .get('http://localhost:8080/api/v1/books')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON(newArray)
.toss();

frisby.create('Delete a book error')
  .delete('http://localhost:8080/api/v1/books/5')
  .expectStatus(404)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON(errorJSON)
.toss();
