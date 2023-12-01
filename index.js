const express = require('express')
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
