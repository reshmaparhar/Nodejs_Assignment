
const Product = require('../models/Product')
module.exports= async(productId,newquantity)=>{
    await Product.findByIdAndUpdate(productId, {"availableQuantity":newquantity},{new: true})
}