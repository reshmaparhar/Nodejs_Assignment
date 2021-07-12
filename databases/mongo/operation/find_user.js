const User = require('../models/user')
module.exports = async(userId)=>{
    const user =  await User.findById(userId)
    return user;
}
