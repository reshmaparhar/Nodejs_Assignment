const express = require('express');
const app = express();
const morgan = require('morgan');
const {port} = require('./config/config');
const connectDB = require('./databases/mongo/operation/database')
connectDB();
const routes = require("./routers/product_routes");
const userRoutes = require('./routers/user_routes')
app.use(express.json())
app.use(morgan('combined'));
app.use('/api', routes);
console.log('hello')
app.use('/userapi',userRoutes);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})