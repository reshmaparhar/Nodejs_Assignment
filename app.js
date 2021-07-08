const express = require('express');
const app = express();
const {port} = require('./config/config');
const connectDB = require('./config/database')
connectDB();
const routes = require("./routers/routes")
app.use('/api', routes);
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})