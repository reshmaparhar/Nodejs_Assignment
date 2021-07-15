const mongoose = require('mongoose');


const User = mongoose.Schema({
    
    "mobileNumber":{
        type:String ,
        length:10,
        unique:true
    },
    "password":{
        type: String, 
        minlength: 8,
        maxlength: 16,
        trim: true,
        required: true 
    }

})
module.exports = mongoose.model('User',User);