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
}


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

  if( _.has(element, 'name') && typeof element.name === "string" &&
      _.has(element, 'ISBN') && typeof element.ISBN === "string") {
          return element;
  }
  return null;
}


/**
 * Gets all the books in the array and returns them
 * @return {[Object]]}         an Array of books
 */
exports.getAllBooks = function() {
    return books;
};

/**
 * Get a book by it's id (right now the id is the index).
 * Returns undefined if the id could not be found
 * @param  {Number} id
 * @return {Object} book element or undefined
 */
exports.getBook = function(id) {
    if(id < books.length) {
        return books[id];
    }
    else {
        return undefined;
    }
};

/**
 * Add a new book to the array and returns the index of the new book
 * @param  {Object} element {title, author, year}
 * @return {Number}         index of new element
 */
exports.addBook = function(element) {
    books.push(element);
    return books.length - 1;
};

/**
 * Replaces the array element with the given id (index), with the
 * given element. Returns true on succes and false if the book could
 * not be found.
 * @param  {Number} id      The id of the book to update
 * @param  {Object} element {title, author, year}
 * @return {Boolean}        False if book could not be found, True otherwise
 */
exports.updateBook = function(id, element) {
    if(id < books.length) {
        books[id] = element;
        return true;
    }
    return false;
};

/**
 * Deletes a book. Returns true on succes and false if the book could
 * not be found.
 * @param  {Number} id      The id of the book to update
 * @return {Boolean}        False if book could not be found, True otherwise
 */
exports.deleteBook = function(id) {
    if(id < books.length) {
        // remove 1 element
        books.splice(id, 1);
        return true;
    }
    return false;
};
