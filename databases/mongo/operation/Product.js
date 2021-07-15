const { networkInterfaces } = require('os');
const Product = require('../models/Product');
const findproduct = async (productId)=>{         
    const product = await  Product.find();
    return product;
}
const findproductbyid= async (productId)=>{         
    const product = await  Product.findById(productId)
    return product;
}
const UpdateProduct= async(productId,newvalue)=>{
    //await Product.findByIdAndUpdate(productId, {"availableQuantity":newquantity},{new: true})
    const product = await Product.findByIdAndUpdate(productId, newvalue,{new: true})
    return product;
}
const deleteproduct = async(productId)=>{
    const product = await Product.findByIdAndDelete(productId)
    return product;
}
const addproduct = async(newProduct)=>{
    try{
        const product = new Product(newProduct);
        await product.save()
        return product
    }
    catch(error){
        if(error.code == 11000){
             return 
        }
    }
        
}
module.exports = {
    findproduct,
    findproductbyid,
    UpdateProduct,
    deleteproduct,
    addproduct
}