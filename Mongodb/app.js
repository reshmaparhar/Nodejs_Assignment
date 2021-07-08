const express = require('express');
const myapp = express();
const  mongoose = require('mongoose')
const logger = require("./middlewares/logger");
const {port} = require('./config/config');
const connectDB = require('./config/database')
connectDB();
const routes = require("./routers/routes")
myapp.use(logger)
myapp.use('/api', routes);
myapp.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})