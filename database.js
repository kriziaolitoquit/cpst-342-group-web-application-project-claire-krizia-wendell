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
          res.render('product', {rows})

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
      res.render('product', { rows });
    }
  });
};

//Display a genre of book
 
let getGenreBookList = (Genre, res) => {

  var searchGenre = `SELECT * FROM bookList WHERE Genre = ?`;

  //console.log(searchGenre);

  var params = [Genre];

  //console.log(params);
  //console.log(params[0].genre);

  var genre = params[0].genre

  db.all(searchGenre, genre, function(err, rows){
    if (err) {
      throw err;
    } else{
      //console.log(rows);
      res.render('product', {rows})
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
      res.render('product', {rows})
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
      res.render('product', {rows})
    }
  });
};

//Display books on detail page 

let getBookInFull = (BookTitle, Author, Price, ID,  res) => {
  var bookDetails = 'SELECT bookList SET BookTitle = ?, Author = ?, Price = ? WHERE ID = ?';; 

  var params = [BookTitle, Author, Price, ID];

  //var bookName = params[0]

  db.all(bookDetails, params, function(err, rows) {
    if (err) {
      throw err;
    } else {
      console.log(rows);
      res.render('productdesc', { rows });
    }
  });
};

//Delete a book item from cart
/*let remove_item = (recordToDelete, res) =>{
    
  var deleteBookItem = 'DELETE FROM bookList WHERE ID = ?';

  var params = [recordToDelete];

db.run(deleteBookItem, params, function(err){
  if (err){
    return console.log(err.message);
  }
  

  console.log("Book Item Deleted");
  console.log(`Rows deleted ${this.changes}`);	  
});

getAllBookTitles(res);
};*/


module.exports = {getAllBookTitles, getSpecificBook, getGenreBookList, getDemographicsBookList, getYearRangeBookList,
  getBookInFull}