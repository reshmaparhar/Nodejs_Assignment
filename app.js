const express = require('express');
const app = express();
const morgan = require('morgan');
const {port} = require('./config/config');
const connectDB = require('./databases/mongo/operation/database')
connectDB();
const routes = require("./routers/product_routes");
const userRoutes = require('./routers/user_routes')
const order_routes = require('./routers/order_routes')
app.use(express.json())
app.use(morgan('combined'));
app.use('/api', routes);
app.use('/userapi',userRoutes);
app.use('/order',order_routes)
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})