const express = require('express');
const axios = require('axios');
const dbOperations = require('./database.js');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000

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
app.use(express.static('assets'));

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

    res.render('home.hbs', { title: "The Digital Book Corner" });
});

app.get('/shoppingCart', function (req, res) {

    res.render('shoppingCart.hbs');
});

app.get('/login', function (req, res) {

    res.render('login.hbs');
});

//Route to home
app.post('/search_item', function (req, res) {

    var bookEntry = req.body;
	
	dbOperations.getSpecificBook(bookEntry, res);

})

//route to home request for genre radio
app.post('/search_genre', function(req,res) {

    var genreEntry = req.body;

    console.log(genreEntry);

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


//Route to Remove Item form cart
app.post('/delete_item', function (req, res) {
	//Getting body parameters
	const { deleterecord} = req.body;
	dbOperations.deleteItem(deleterecord, res);
	
 });

// Route to handle adding items to the cart

 //Initialize local cart

 //console.log('Before initialization:', app.locals.cart);

 // Initialize app.locals.cart as an empty array
 app.locals.cart = [];
 
 //console.log('After initialization:', app.locals.cart);

  app.post('/addToCart', (req, res) => {
    var { bookTitle, price } = req.body;

    var data = {index_cart: req.body}

    //console.log(data);

    var bookTitle = data.index_cart.BookTitle;
    var price = data.index_cart.Price;

    //console.log('Book Title:', bookTitle);
    //console.log('Price:', price);

    // Access the cart from app.locals instead of req.session

    var cart = app.locals.cart;

    // Add the item to the cart (you may want to check for duplicates or perform additional checks)
    cart.push({
        bookTitle: bookTitle,
        price: price,
    });

    //console.log(cart);

    // Respond with a success message or updated cart data

    res.json({ message: 'Item added to the cart', cart: cart });
    });
    

app.get('/addToCart', (req, res) => {
     //Render your shopping page here
   res.render('shoppingCart.hbs');
});


//Route to product page
app.get ('/product' , function(req, res) {
    res.render('product.hbs')
});

//Route to product description page
app.get('/productdesc' , function(req, res){
    res.render('productdesc.hbs')
});


//Route to about page
app.get('/about' , function(req,res){
    res.render('about.hbs')
});


//Route to Contact page
app.get ('/contact' , function(req, res) {
    res.render('contact.hbs')
});



//contact method 

app.get('/submit', (req, res) => {
    // the statement below assigns the parameters passed from the from via the name attribute to the variable formInfo.  
    var formInfo = req.query;

    // the second argument passes data back to the form
    res.render('confirmation', {firstName : formInfo.fname,
                                lastName : formInfo.lname,
                                email : formInfo.email,
                                phone : formInfo.phone,
                                contact_method: formInfo.preferred_method})
 })

app.listen(port, () => console.log(`Digital Book Corner App listening on port ${port}!`))

