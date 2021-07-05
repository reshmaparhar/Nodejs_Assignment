const express = require('express');
const app = express();
//const logger = require('./logger')
const products = require('./data')
const {schema} = require('./schema'); 
const api = require('./routes/api')
app.use(express.urlencoded({extended: false}) )
app.use(express.json())
//app.use(logger)
var morgan = require('morgan')
app.use(morgan('combined'))

app.use('/api',api)

app.listen(3000,()=>{
    console.log('listening on port 3000');
})