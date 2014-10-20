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

	// retrieve books
	// allBooks.push(new Book('The Great Gatsby', 'Fitzgerald', 1));
	// allBooks.push(new Book('Tin Drum', 'Grass', 1));
	// allBooks.push(new Book('Taco', 'Grass', 1));
 db.query("SELECT * FROM books;", [], function(err, resultSet){
    if (err) console.log("QUERY FAILED", err);
    resultSet.rows.forEach(function(row){//rows is what comes back from the db.
    	var aBook = new Book(row.title, row.author, row.id);//aBook constructs w/row input
 			allBooks.push(aBook);//each aBook is pushed to allBooks.
    });
			// console.log(allBooks);
  		buzzer(allBooks);//the buzzer is the function from app.js that renders the page.
	});

	// return allBooks;
};

Library.prototype.add = function(title1, author1, buzzer) {
	var newBook = {}
	// console.log(title);
	// TODO
	// db.query... INSERT
 db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *;", [title1, author1], function(err){
    if (err) console.log("QUERY FAILED", err);
			// console.log(allBooks);
  		// buzzer();//the buzzer is the function from app.js that renders the page.
	});	
	// call buzzer with the new book
	buzzer();
};

Library.prototype.destroy = function(id1, buzzer) {
	// TODO
	// console.log(id1);
	db.query("DELETE FROM books WHERE id = $1;", [id1],function(err){
    if (err) console.log("QUERY FAILED", err);

		})
	// db.query... DELETE
	// call buzzer without params when done
	buzzer();
};

Library.prototype.update = function(id, title, author, buzzer) {
	// TODO
	db.query("UPDATE books SET (title, author) = ($2, $3) WHERE id = $1", [id,title,author],function(err){
    if (err) console.log("QUERY FAILED", err);

	});  
	// call buzzer without params when done
	buzzer();
};


Library.prototype.findById = function(id, buzzer) {
	var foundBook = {};
	// TODO
	db.query("SELECT * FROM books WHERE id = $1", [id],function(err,resultset){
    if (err) console.log("QUERY FAILED", err);
    foundBook.title=resultset.rows[0].title;
    // console.log(resultset.rows[0].title);

    foundBook.author=resultset.rows[0].author;
    foundBook.id=resultset.rows[0].id;
    // console.log(foundBook);

	buzzer(foundBook);

	}) ;
	// call buzzer with the book found
	// console.log(foundBook);

};

module.exports = Library;
