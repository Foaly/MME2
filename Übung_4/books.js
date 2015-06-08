// dummy book data
var books = [
    {
        title: "Harry Potter and the Philosophers Stone",
        author: "J.K.Rowling",
        year: ""
    },
    {
        title: "The Lord Of The Rings",
        author: "J.R.R.Tolken",
        year: ""
    },
    {
        title: "Eragon",
        author: "",
        year: ""
    },
    {
        title: "Bartimäus",
        author: "",
        year: ""
    }
];

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
exports.getBookById = function(id) {
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
