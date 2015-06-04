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

