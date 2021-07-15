const User = require('../models/user')
const finduserbyid = async(userId)=>{
    const user =  await User.findById(userId)
    return user;
}
const finduser =  async(userId)=>{
    const user =  await User.find(userId)
    return user;
}
const adduser = async(newProduct)=>{
    try{
        const user = new User(newProduct);
        await user.save()
        return user;
    }
    catch(error){
        if(error.code == 11000){
            
            return 
     }
 }
        
}
module.exports = {
    finduserbyid,
    finduser,
    adduser
}