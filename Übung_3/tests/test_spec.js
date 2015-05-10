var frisby = require('frisby');
var server = require('../server.js');

frisby.create('Hello world test')
  .get('http://localhost:8080')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'text/html')
  .expectBodyContains('Hello World!')
.toss();
