const express = require('express');
const app = express();

const products = require('./data')
//console.log(products)
app.use(express.urlencoded({extended: false}) )
  
app.use(express.json())
//var bodyParser = require('body-parser');

//app.use(bodyParser.urlencoded({ extended: false }));
const api = require('./routes/api')
app.use('/api',api)
app.listen(3000,()=>{
    console.log('listening on port 3000');
})