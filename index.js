const express = require('express');
const axios = require('axios');
const dbOperations = require('./database.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

// Define a route that makes a call to an external REST API
app.get('/external-api', async (req, res) => {
    try {
      
      const apiUrl = 'https://656aa013dac3630cf7272f11.mockapi.io/api/v1/books';
      
      // Make a GET request to the external API
      const response = await axios.get(apiUrl);

      // Extract data from the API response
      const apiData = response.data;
  
      // Send the API data as a JSON response to the client
      res.json(apiData);
    } catch (error) {
      console.error('Error calling external API:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//for our files, css, pictures and pdfs//
app.use(express.static('assets'))

//view templateing setup//
app.set('view engine', 'hbs');

//for any html extentions we may need//
app.engine('views', require('hbs').__express);

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

//Route to home get all items
app.get('/', function (req, res) {

    //dbOperations.getAllBookTitles(res);

    res.render('home.hbs', { title: "The Digital Book Corner" });
});

//Route to home
app.post('/search_item', function (req, res) {

    var bookEntry = req.body;
	
	dbOperations.getSpecificBook(bookEntry, res);

})

//route to home request for genre radio
app.post('/search_genre', function(req,res) {
    //console.log(req.body);

    var genreEntry = req.body;

    dbOperations.getGenreBookList(genreEntry, res);
});


//route to home request for demographics radio
app.post('/search_demographics', function(req,res){

    var  demographicsEntry = req.body;

    dbOperations.getDemographicsBookList(demographicsEntry, res);
});

//route to home request for yearRange

app.post('/search_year', function(req, res){

    var yearEntry = req.body.yearRange;

    dbOperations.getYearRangeBookList(yearEntry, res);

});

//route to home for priceRange

/*app.post('/search_price', function(req, res){
    // Extract the priceEntry from the request body
    var priceEntry = req.body.priceRange;

    // Log the received priceEntry for debugging
    console.log(priceEntry);

    // Call the getPriceRangeBookTitle function from dbOperations
    dbOperations.getPriceRangeBookList(priceEntry, res);
});*/

//create search function

//const searchInput = document.querySelector('.input')

//event listener for search function 

/*searchInput.addEventListener("input", (e) =>{

    //declare event target
    let value = e.target.value

    //check if input exists
    if (value && value.trim().length> 0){
        
        value = value.trim().toLowerCase()

        setList(bookList.filter(BookTitle => {
            return bookList.BookTitle.includes(value)
        }))

        setList(bookList.filter(Author => {
            return bookList.BookTitle.includes(value)
        }))

        setList(bookList.filter(Genre => {
            return bookList.Genre.includes(value)
        }))

        setList(bookList.filter(PublishedYear => {
            return bookList.PublishedYear.include(value)
        }))

        setList(bookList.filter(NumberOfCopies => {
            return bookList.NumberOfCopies.include(value)
        }))

    } else{
        // return nothing
        clearList()
    }
})

//creating and declaring a function for a setlist
function setList(results){
    for (const person of results){
        // creating a li element for each result item
        const resultItem = document.createElement('li')

        // adding a class to each item of the results
        resultItem.classList.add('result-item')

        // grabbing the name of the current point of the loop and adding the name as the list item's text
        const text = document.createTextNode(bookList)

        // appending the text to the result item
        resultItem.appendChild(text)

        // appending the result item to the list
        list.appendChild(resultItem)
    }
}

const clearButton = document.getElementById('clear')

clearButton.addEventListener("click", () =>{

})

function clearList(){
    // looping through each child of the search results list and remove each child
    while (list.firstChild){
        list.removeChild(list.firstChild)
    }
}

//Route to product page

app.get('/', function(req, res){
    res.render('home.hbs');
})*/


//Route to load product data
/*app.get("/", (req, res) => {
    const query = `SELECT * FROM product LIMIT 3`;

    //Execute Query
    connection.query (query, (error, result) => {
        if(!req.session.cart) {
            req.session.cart = [];
        }

        response.reder('product', { products : result, cart : req.session.cart});
    });
});*/

//Create Route for Add Item into Cart
/*app.post ('/add_cart', (req, res) => {

    const ID = req.body.product_ID;

    const BookTitle = req.body.BookTitle; 

    const Author = req.body.Author;

    const book_price = req.body.book_price;

    let count= 0;

    for(let i = 0; i < req.session.cart.length; i++)
    {
        if (req.session.cart[i].ID === ID)
        {
            request.session.cart[i].quantity += 1;

            count++;
        }
    }

    if(count === 0)
    {
        const cart_data ={
            ID : ID, 
            BookTitle : BookTitle, 
            Author : Author,
            book_price_price : parseFloat(book_price_price),
            quantity : 1
        };

        req.session,cart.push(car_data);
    }

    response.redirect("/");
})*/

//Route to Remove Item form cart
app.get ('/remove_item', (req, res) => {

    const ID = req.query.ID;

    for(let i = 0; i < req.session.cart.length; i++)
    {
        if(req.session.cart[i].product_id === product_id)
        {
            req.session.cart.splice(i,1);
        }
    }

    res.redirect("/");
})

//Route to Contact page
app.get ('/contact' , function(req, res) {
    res.render('contact.hbs')
})

//contact method 

app.get('/submit', (req, res) => {
    // the statement below assigns the parameters passed from the from via the name attribute to the variable formInfo.  
    var formInfo = req.query;

    // the second argument passes data back to the form
    res.render('confirmation', {name : formInfo.fname, contact_method: formInfo.preferred_method})
 })

app.listen(port, () => console.log(`Digital Book Corner App listening on port ${port}!`))

