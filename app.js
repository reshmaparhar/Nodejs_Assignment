const express = require('express');
const app = express();
const morgan = require('morgan');
const {port} = require('./config/config');
const connectDB = require('./databases/mongo/operation/database')
connectDB();
const routes = require("./routers/productRoutes");
const userRoutes = require('./routers/userRoutes')
const orderRoutes = require('./routers/orderRoutes')
app.use(express.json())
app.use(morgan('combined'));
app.use('/api', routes);
app.use('/userapi',userRoutes);
app.use('/order',orderRoutes)
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})