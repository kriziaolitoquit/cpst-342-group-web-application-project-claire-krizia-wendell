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