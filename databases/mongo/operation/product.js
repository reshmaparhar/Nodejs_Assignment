const { networkInterfaces } = require('os');
const Product = require('../models/product');
const findProduct = async (productId)=>{         
    const product = await  Product.find();
    return product;
}
const findProductById= async (productId)=>{         
    const product = await  Product.findById(productId)
    return product;
}
const updateProductById= async(productId,newvalue)=>{
    const product = await Product.findByIdAndUpdate(productId, newvalue,{new: true})
    return product;
}
const deleteProductById = async(productId)=>{
    const product = await Product.findByIdAndDelete(productId)
    return product;
}
const addNewProduct = async(newProduct)=>{
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
    findProduct,
    findProductById,
    updateProductById,
    deleteProductById,
    addNewProduct
}