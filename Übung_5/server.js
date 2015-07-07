var express = require('express');
var bodyParser = require('body-parser');
var basicAuth = require('basic-auth');
var _ = require('underscore');
var mongojs = require('mongojs');

var Books = require('./books');

var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
// connect to local mongodb
var db = mongojs('mydb', ['books']);


// insert dummy data if db is empty
db.books.count(function (err, count) {
    if (!err && count === 0) {
        Books.populateDB(db);
    }
});

// display all books
db.books.find(function(error, docs) {
    console.log(docs);
    if(error) {
      console.log(error);
    }
});


var bookNotFoundError = {
    type: "error",
    statusCode: 404,
    msg: "Requested resource not found"
}


// parse Content-Type:application/json into JSON
app.use(bodyParser.json({ type: ['application/json', 'text/plain'] }));

// enable authentication
var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.status(401).send();
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'user' && user.pass === 'password') {
    return next();
  } else {
    return unauthorized(res);
  };
};
app.use(auth); // on all routes

// configure the router
router.route('/books/')
    .get(function(request, result) {
        var paginationLimit = Number(_.defaults(_.pick(request.query, 'limit'), {limit: 0}).limit);
        var paginationSkip = Number(_.defaults(_.pick(request.query, 'skip'), {skip: 0}).skip);
        // get query parameters for wildcard search
        var queryWildcard = _.mapObject(_.pick(request.query,'name', 'description', 'ISBN'), function(val, key){
            return new RegExp(val, 'i');
        });
        // get query parameters for number search (must not be converted to RegEx)
        var queryNumbers = _.mapObject(_.pick(request.query, 'state'), function(val, key) {
            return Number(val);
        });
        // combine to one query
        query = _.extend(queryWildcard, queryNumbers);
        // send all books
        db.books.find(query).limit(paginationLimit).skip(paginationSkip, function(err, docs) {
          result.status(200).send(docs);
        });
    })
    .post(function(request, result) {
        // check if the data parsed by bodyParser is valid
        var book = Books.validateInput(request.body)
        if(book !== null) {
            db.books.insert(book, function(error, docInserted) {
              if(error) {
                result.status(400).send("Error inserting book into mongoDB: " + error);
              }
              else {
                result.status(201);
                result.location('/books/' + docInserted._id); // good practice
                result.send(docInserted);
              }
            });
        }
        else {
          result.status(400).send("Error malformated book object received.");
        }
    });

router.route('/books/:id')
    .get(function(request, result) {
        var id = request.params.id;
        try {
          mongojs.ObjectId(id);
        } catch(e) {
          result.status(400).send(id + " is not a valid database id!");
          return;
        }
        db.books.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
          if(!docs) {
            // book was not found send an error JSON
            result.status(bookNotFoundError.statusCode).send(bookNotFoundError);
          } else {
            result.status(200).send(docs);
          }
        });
    })
    .put(function(request, response) {
        var id = request.params.id;
        try {
          mongojs.ObjectId(id);
        } catch(e) {
          result.status(400).send(id + " is not a valid database id!");
          return;
        }

        var book = Books.validateInput(request.body);
        if(book !== null) {
          db.books.update({_id: mongojs.ObjectId(id)}, book, function(error, docs) {
              if(error) {
                result.status(400).send("Error updating book in mongoDB: " + error);
              }
              // books was succesfully updated, send the book back
              response.status(200).send(book);
          });
        }
        else {
            // book was not found send an error JSON
            response.status(bookNotFoundError.statusCode).send(bookNotFoundError);
        }
    })
    .delete(function(request, response) {
        var id = request.params.id;
        try {
          mongojs.ObjectId(id);
        } catch(e) {
          response.status(400).send(id + " is not a valid database id!");
          return;
        }
        // check if id is in database
        db.books.count({_id: mongojs.ObjectId(id)}, function(err, n) {
          if(n === 1) {
            db.books.remove({_id: mongojs.ObjectId(id)}, function(error, state) {
              if(error) {
                response.status(400).send("Error deleting book from mongoDB: " + error);
              }
              else if(state.ok === 1) {
                response.status(204).send();
              }
            });
          }
          else {
            // book was not found send an error JSON
            response.status(bookNotFoundError.statusCode).send(bookNotFoundError);
          }
        });
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
