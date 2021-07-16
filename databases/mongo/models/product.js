const mongoose = require('mongoose');
const Product = mongoose.Schema({
    "_id":{
        type:Number,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "price":{
        type:Number,
        required:true
    },
    "availableQuantity":{
        type:Number,
        required:true
    },
    "manufacturer":{
        type:String,
        required:true
    },
    "image":{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('Product',Product);