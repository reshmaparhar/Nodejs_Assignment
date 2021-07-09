const mongoose = require('mongoose');
var mongooseTypePhone = require('mongoose-type-phone');

const User = mongoose.Schema({
    "_id": {
        type:mongoose.Types.ObjectId
    },
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