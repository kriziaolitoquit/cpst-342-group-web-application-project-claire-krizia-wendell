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

        setList(people.filter(person => {
            return person.name.includes(value)
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
        const text = document.createTextNode(person.name)

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


//Route to load product data
app.get("/", (req, res) => {
    const query = `SELECT * FROM product LIMIT 3`;

    //Execute Query
    connection.query (query, (error, result) => {
        if(!req.session.cart) {
            req.session.cart = [];
        }

        response.reder('product', { products : result, cart : request.session.cart});
    });
});

//Create Route for Add Item into Cart
app.post ('/add_cart', (req, res) => {

    const product_id = req.body.product_id;

    const product_name = req.body.product_name; 

    const product_price = req.body.product_price;

    let count= 0;

    for(let i = 0; i < req.session.cart.length; i++)
    {
        if (req.session.cart[i].product_id === product_id)
        {
            request.session.cart[i].quantity += 1;

            count++;
        }
    }

    if(count === 0)
    {
        const cart_data ={
            product_id : product_id, 
            product_name : product_name, 
            product_price : parseFloat(parduct_price),
            quantity : 1
        };

        req.session,cart.push(car_data);
    }

    response.redirect("/");
})

//Route to Remove Item form cart
app.get ('/remove_item', (req, res) => {

    const product_id = req.query.id;

    for(let i = 0; i < req.session.cart.length; i++)
    {
        if(req.session.cart[i].product_id === product_id)
        {
            req.session.cart.splice(i,1);
        }
    }

    res.redirect("/");
})