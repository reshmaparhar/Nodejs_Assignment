const express = require('express');
const app = express();
const api = require('./routes/api')
const {port} = require('./config/config');

app.use(express.urlencoded({extended: false}) )
app.use(express.json())
var morgan = require('morgan')
app.use(morgan('combined'))

app.use('/api',api)
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})