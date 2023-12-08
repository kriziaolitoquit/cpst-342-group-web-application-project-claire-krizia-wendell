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

//Display a genre of book
 
let getGenreBookList = (Genre, res) => {
  var searchGenre = 'SELECT * FROM bookList WHERE Genre = (?)';
  var params= [Genre];
  db.all(searchGenre, Genre, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display a book by Demographic
let getDemographicsBookList = (Demographics, res) => {
  var searchDemographics = 'SELECT * FROM bookList WHERE Demographics = (?)';
  var params= [Demographics];
  db.all(searchDemographics, Demographics, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book release dates by range of <2000
let getSmallestYearBookList = (PublishedYear, res) => {
  var searchSmallYear = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN 0 AND 2000';

  db.all(searchSmallYear, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}


//Display book release dates by range of 2001 - 2010
let getSmallMidYearBookList = (PublishedYear, res) => {
  var searchSmallMidYear = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN 2001 AND 2010';

  db.all(searchSmallMidYear, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book release dates by range of 2011 - 2020
let getMidYearBookList = (PublishedYear, res) => {
  var searchMidYear = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN 2011 AND 2020';

  db.all(searchMidYear, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book release dates by range of 2021 and beyond
let getBigYearBookList = (PublishedYear, res) => {
  var searchBigYear = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN 2021 AND 2030';

  db.all(searchBigYear, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $0 - $10
let getLowestPriceBookList = (Price, res) => {
  var searchLowestPrice = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN $0 AND $10';

  db.all(searchLowestPrice, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $11 - $20
let getLowestMidBookList = (Price, res) => {
  var searchLowestMidPriceList = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN $11 AND $20';

  db.all(searchLowestMidPriceList, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $21 - $35
let getLowMidBookList = (Price, res) => {
  var searchLowMidPriceList = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN $21 AND $35';

  db.all(searchLowMidPriceList, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $36 - $50
let getMidBookList = (Price, res) => {
  var searchMidPriceList = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN $36 AND $50';

  db.all(searchMidPriceList, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $51 - $75
let getHighMidBookList = (Price, res) => {
  var searchHighMidPriceList = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN $51 AND $75';

  db.all(searchHighMidPriceList, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $76 - $99
let getHighBookList = (Price, res) => {
  var searchHighPriceList = 'SELECT * FROM bookList WHERE PublishedYear BETWEEN $51 AND $75';

  db.all(searchHighPriceList, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

//Display book price $100+
let getHighestBookList = (Price, res) => {
  var searchHighestPriceList = 'SELECT COUNT(Id) FROM bookList WHERE Price $100 <';

  db.all(searchHighestPriceList, function(err, rows){
    if (err) {
      throw err;
    } else{
      console.log(rows);
      res.render('home', {rows})
    }
  })
}

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
      
  })
  
}

module.exports = {getAllBookTitles, getSpecificBook, getGenreBookList, getDemographicsBookList, getSmallestYearBookList, getSmallMidYearBookList, getMidYearBookList, getBigYearBookList, getLowestPriceBookList, getLowestMidBookList, getLowMidBookList, getMidBookList, getHighMidBookList, getHighBookList, getHighestBookList,
  createBook, deleteBook, updateBook}