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


module.exports = {getAllBookTitles}