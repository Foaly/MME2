var _ = require("underscore");
﻿
// dummy book data
var books = [
    {
        name: "Harry Potter and the Philosophers Stone",
        description : "The author is J.K.Rowling",
        ISBN: "1",
        state: 0
    },
    {
        name: "The Lord Of The Rings",
        description: "The author is J.R.R.Tolken",
        ISBN: "2",
        state: 0
    },
    {
        name: "Eragon",
        description: "A fantasy book",
        ISBN: "3",
        state: 0
    },
    {
        name: "Bartimäus",
        description: "A book about magic",
        ISBN: "",
        state: 0
    }
];


/**
 * Put some default data into the db
 */
exports.populateDB = function(db) {
  db.books.insert(books, function(error) {
    if(error)
      console.log("Error: " + error);
    else {
      console.log('Database initialized!');
    }
  });
};


exports.validateInput = function(element) {
  if (element === null || element === undefined || _.isEmpty(element)) {
      return null;
  }
  element = _.pick(element, 'name', 'description', 'ISBN', 'state');
  if(_.has(element, 'state') && !_.isNumber(element.state)) { //if state is no number, convert!
      element.state = 0;
  }
  element = _.defaults(element, {state: 0}); //if no state is given, set default state of 0

  if(_.has(element, 'description') && !_.isString(element.description)) { //if description is no string, convert!
      element.description = String(element.description);
  }

  if( _.has(element, 'name') && _.isString(element.name) &&
      _.has(element, 'ISBN') && _.isString(element.ISBN)) {
          return element;
  }
  return null;
};
