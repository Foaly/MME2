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

exports.getAllBooks = function() {
    return books;
};

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
}
