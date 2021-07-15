const User = require('../models/user')
const findUserById = async(userId)=>{
    const user =  await User.findById(userId)
    return user;
}
const findUser =  async(userId)=>{
    const user =  await User.find(userId)
    return user;
}
const addNewUser = async(newProduct)=>{
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
    findUserById,
    findUser,
    addNewUser
}