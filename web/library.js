"use strict"

var DB = require('./mydb_lib.js');

var db = new DB("library_example_app", 5432, "localhost");

function Book(title, author, id) {
  this.id = id;
  this.title = title;
  this.author = author;
}

function Library() {
}

// TOGETHER!
Library.prototype.all = function(buzzer) {
	var allBooks = [];

 db.query("SELECT * FROM books;", [], function(err, resultSet){
    if (err) console.log("QUERY FAILED", err);
    resultSet.rows.forEach(function(row){
    	var aBook = new Book(row.title, row.author, row.id);
 			allBooks.push(aBook);
    });
    console.log(allBooks);
    buzzer(allBooks);
	});
};

Library.prototype.add = function(title, author, buzzer) {
	var newBook = {}
	// TODO
	// db.query... INSERT
	// call buzzer with the new book
	buzzer(newBook);
};

Library.prototype.destroy = function(id, buzzer) {
	// TODO
	// db.query... DELETE
	// call buzzer without params when done
	buzzer();
};

Library.prototype.update = function(id, title, author, buzzer) {
	// TODO
	// db.query... UPDATE
	// call buzzer without params when done
	buzzer();
};


Library.prototype.findById = function(id, buzzer) {
	var foundBook = {}
	// TODO
	// db.query... SELECT
	// call buzzer with the book found
	buzzer(foundBook);
};

module.exports = Library;
