//const User = require('../models/user')
const finduser = (userId)=>{
    const mongoose = require('mongoose');

    const User = require('../models/user')
    const user =  User.findById(userId)
    if(user){
       // console.log(user)
        return user;
    }
    else{
        return res.json(responseFunction(false,`Sorry !! user with this id does not exists in database`,null))
    }
}
module.exports = finduser;
