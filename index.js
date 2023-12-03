const express = require('express')
const dbOperations = require('./database.js');
const app = express()
const port = 3000

//for our files, css, pictures and pdfs//
app.use(express.static('assets'))

//view templateing setup//
app.set('view engine', 'html');

//for any html extentions we may need//
app.engine('html', require('hbs').__express);

// parse application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Route to home
app.get('/', function (req, res) {
	
	dbOperations.getAllItems(res);

    res.render('home.hbs', {title: "title of site"})

})

//create search function

const searchInput = document.querySelector('.input')

//event listener for search function 

searchInput.addEventListener("input", (e) =>{

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

//creating and declaing a fuchtion for a setlist
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
    res.render('product.hbs');
})


//Route to load product data
app.get("/", (req, res) => {
    const query = `SELECT * FROM product LIMIT 3`;

    //Execute Query
    connection.query (query, (error, result) => {
        if(!req.session.cart) {
            req.session.cart = [];
        }

        response.reder('product', { products : result, cart : req.session.cart});
    });
});

//Create Route for Add Item into Cart
app.post ('/add_cart', (req, res) => {

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
})

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
app.get ('/' function(res, req){
    res.render(contact.hbs)
})

//contact method 

app.get('/submit', (req, res) => {
    // the statement below assigns the paramters passed from the from via the name attribute to the variable formInfo.  
    var formInfo = req.query;

    // the second argument passes data back to the 
    res.render('confirmation', {name : formInfo.fname, contact_method: formInfo.preferred_method})
 })

app.listen(port, () => console.log(`Digital Book Corner App listening on port ${port}!`))

