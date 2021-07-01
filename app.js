const express = require('express');
const app = express();

const products = require('./data')
//console.log(products)

const api = require('./routes/api')
app.use('/api',api)
app.listen(3000,()=>{
    console.log('listening on port 3000');
})