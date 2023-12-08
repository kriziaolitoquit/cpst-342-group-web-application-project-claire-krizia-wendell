var sqlite3 = require('sqlite3').verbose() //npm install sqlite3

//Creating a new database instance - Indication of connected database
//Before peforming any operations to database, make sure database is connected.
let db = new sqlite3.Database('./booksdb.db', sqlite3.OPEN_READWRITE, (err) => {
	if (err) {
	  // Cannot open database
	  console.error(err.message)
	  throw err
	}else{
		//Successful database connection
		console.log('Connected to the SQLite database.') 
	}
});


//Display all books
let getAllBookTitles = (res) => {
    var getAllBookItems = 'SELECT Id, BookTitle, Author, Genre, PublishedYear, NumberOfCopies FROM bookList';
    db.all(getAllBookItems, function(err, rows){
        if (err) {
         
            throw err;
          }
          /*rows.forEach((row) => {
            console.log(row.item_name);
          });*/
          console.log(rows);
          res.render('home', {rows})

    })
}

//Display a specific book
let getSpecificBook = (BookTitle, res) => {
  var searchBook = `SELECT BookTitle, Author, PublishedYear FROM bookList WHERE BookTitle LIKE '%${BookTitle}%'`;
  //var bookTitleWildcard = `%${BookTitle}%`;

  db.all(searchBook, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.render('home', { rows });
    }
  });
};

//Insert a book into the database
let createBook= (BookTitle, Author, Genre, PublishedYear, NumberOfCopies, res) =>{
  var createBookItem = 'INSERT INTO bookList (BookTitle, Author, Genre, PublishedYear, NumberOfCopies) VALUES (?,?,?,?,?)'; //Parameterized Query
  var params = [BookTitle, Author, Genre, PublishedYear, NumberOfCopies];
  
  db.run(createBookItem, params, function(err){

      if(err){
          return console.log(err.message);
      }
      
      console.log("Book Item Created");
      console.log(`Rows inserted ${this.changes}`);

      getAllBookTitles(res);
  })
}


//Delete a book item
let deleteBook = (recordToDelete, res) =>{
    
  var deleteBookItem = 'DELETE FROM bookList WHERE itemID = ?';

  var params = [recordToDelete];

db.run(deleteBookItem, params, function(err){
  if (err){
    return console.log(err.message);
  }
  

  console.log("Book Item Deleted");
  console.log(`Rows deleted ${this.changes}`);	  
});

getAllBookTitles(res);
}

//Update a Grocery List Item
let updateBook = (BookTitle, Author, Genre, PublishedYear, NumberOfCopies, res) =>{

  var updateBookItem = 'UPDATE bookList SET BookTitle = ?, Author = ?, Genre = ?, PublishedYear = ?, NumberOfCopies =?';

  var params = [BookTitle, Author, Genre, PublishedYear, NumberOfCopies];

  db.run(updateBookItem, params, function(err){
      if(err){
          return console.log(err.message);
      }
      
      console.log("Book Item Updated");
      console.log(`Rows updated ${this.changes}`);
      getAllBookTitles(res);
      
  })
  
}

module.exports = {getAllBookTitles, getSpecificBook, createBook, deleteBook, updateBook}