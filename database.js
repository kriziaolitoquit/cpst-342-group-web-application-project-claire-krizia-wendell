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
    var getAllBookItems = `SELECT * FROM bookList`;
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
  var searchBook = `SELECT * FROM bookList WHERE BookTitle LIKE ?`;
  
  var params = [`%${BookTitle.BookTitle}%`];

  //console.log(params[0]);

  //console.log(params[0].BookTitle);

  var bookName = params[0]

  db.all(searchBook, bookName, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.render('home', { rows });
    }
  });
};

//Display a genre of book
 
let getGenreBookList = (Genre, res) => {

  var searchGenre = `SELECT * FROM bookList WHERE Genre = ?`;

  var params = [Genre];

  //console.log(params);
  //console.log(params[0].genre);

  var genre = params[0].genre

  db.all(searchGenre, genre, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  });
};

//Display a book by Demographic
let getDemographicsBookList = (Demographics, res) => {
  var searchDemographics = `SELECT * FROM bookList WHERE Demographics = ?`;

  var params= [Demographics];

  //console.log(params);

  var demographics = params[0].demographics

  db.all(searchDemographics, demographics, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  });
};

//Display book release dates by range
let getYearRangeBookList = (yearRange, res) => {
  var searchYear = `SELECT * FROM bookList WHERE PublishedYear BETWEEN ? AND ?`;

  var params = yearRange.split(',');

  //console.log(params);

  db.all(searchYear, params, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  });
};

//Display book price by range
/*let getPriceRangeBookList = (priceEntry, res) => {
  // Extract the selected price from the request body
  var selectedPrice = priceEntry.selectedPrice;

  // Perform a database query based on the selected price
  var searchPrice = 'SELECT BookTitle FROM bookList WHERE Price = ?';

  var titleBook = selectedPrice;

  console.log(titleBook);

  db.all(searchPrice, titleBook, function(err, rows) {
      if (err) {
          throw err;
      } else {
          console.log(rows);
      }
  });
};*/

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
  });
};


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

//Update Book List Item
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
      
  });
  
};

module.exports = {getAllBookTitles, getSpecificBook, getGenreBookList, getDemographicsBookList, getYearRangeBookList,
  createBook, deleteBook, updateBook}