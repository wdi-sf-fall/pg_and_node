"use strict"

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Library = require('./library.js');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

var library = new Library();

//Home
app.get('/', function(req, res){
  res.render('home');
});

//Index
app.get('/books', function(req, res){
  //DONE!
  console.log("/BOOKS");
  library.all(function(leBooks){//.all passes the buzzer with (leBooks) and the res.render instruction.
   res.render('library/index', {allBooks: leBooks});
     // console.log(leBooks);

 });
  // var leBooks = library.all();
});

//New
app.get('/books/new', function(req, res){
  //DONE
	res.render("library/new");
});

//Create
app.post('/books', function(req, res) {
	//TODO
  var newTitle = req.body.book.title;
  var newAuthor = req.body.book.author;
  // console.log(newTitle);
  library.add(newTitle,newAuthor,function(){
      res.redirect('/books'); 

  });
  // console.log("/books -> Implement me.");
  // library.add ....
});

//Show
app.get('/books/:id', function(req, res) {
  var id = req.params.id;
  //TODO
  console.log("/books -> Implement me.");
  // library.findById ...
  // Add library/show.ejs page and render it with found book
  // Add "Show" link on '/books' page.
  res.send("implement show book. showing book " + req.params.id);
});

//Edit
app.get('/books/:id/edit', function(req, res) {
	var id = req.params.id;
  var foundBook = {};

  //TODO
  // console.log("book id is " + id);
  library.findById(id, function(foundBook) {
  // console.log(foundBook);
  res.render('library/edit', {myBook: foundBook});

  });

});

//Update
app.put('/books/:id', function(req, res) {
	var id = req.params.id;
  var updatedTitle = req.body.book.title;
  var updatedAuthor = req.body.book.author;

  //TODO
  // console.log(id + " : " + updatedAuthor +" : " +updatedTitle);
  library.update(id,updatedTitle,updatedAuthor,function(){

  res.redirect('/books');

  });
});

//Delete
app.delete('/books/:id', function(req, res) {
	var id = req.params.id;
  //TODO
  library.destroy(id,function(){
      res.redirect('/books');

    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});