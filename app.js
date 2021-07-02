const express = require('express');
const app = express();
const logger = require('./logger')
const products = require('./data')
//console.log(products)
app.use(express.urlencoded({extended: false}) )
app.use(express.json())
//app.use(bodyParser())
//var bodyParser = require('body-parser');
app.use(logger)
//app.use(bodyParser.urlencoded({ extended: false }));
const api = require('./routes/api')
app.use('/api',api)
app.listen(3000,()=>{
    console.log('listening on port 3000');
})