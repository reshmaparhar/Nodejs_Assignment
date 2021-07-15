const mongoose = require('mongoose');
//const User = require('./user');//
//const Product = require('./Product')
const Order = mongoose.Schema({
    "orderCreatedBy": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    "productId": {
        type:Number,
        ref:'Product', 
        required: true
            
    },
    "quanity": {
        type:Number
    },
    "totalCost": {
        type:Number
    }
})

module.exports = mongoose.model('Order',Order);