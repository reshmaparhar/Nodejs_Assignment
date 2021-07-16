const { networkInterfaces } = require('os');
const Product = require('../models/product');
const path = require('path')
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
        const file = newProduct.file.filename
        const fileName = path.relative('../../../Images', `/Images/${file}`)
        const product ={
            "_id" :newProduct.body._id,
            "name":newProduct.body.name,
            "price":newProduct.body.price,
            "availableQuantity":newProduct.body.availableQuantity,
            "manufacturer":newProduct.body.manufacturer,
            "image":fileName
        }
     
        const product1 = new Product(product);
        await product1.save()
        return product1
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