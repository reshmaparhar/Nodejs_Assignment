const { query } = require('express');
const responseFunction = require('../helpers/response')
const Product = require('../databases/mongo/models/Product');

const AddProduct = async(req, res) => {
   try{
       const product = new Product(req.body);
        await product.save()
        res.status(201).json(responseFunction(true,"Product added Successfully",product))
       
     
   }
    catch(error){
        if(error.code == 11000){
               res.status(400).json(responseFunction(false," Product already exists in database",null));
        }
        else{
            res.status(400).json(responseFunction(false,error.message,null));
        }
    }
}

const getProduct = async(req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json(responseFunction(true,"Products fetched successfully",product));
    }
    catch(error){
          res.status(400).json(responseFunction(false,error.message,null));
    }
    
} 

const updateProduct = async(req,res)=>{
    try{
        product = await Product.findByIdAndUpdate(req.params._id,{"name":req.body.name},{new: true})
        if (product){
        res.json(responseFunction(true,`Product with id ${req.params._id} updated  Successfully`,product))
        }
        else{
            res.json(responseFunction(false,`Product with id ${req.params._id} does not exists in database`,null))
        }
    }
    catch(error){
        res.json(responseFunction(false,error.message,null))
    }
};
const deleteProduct = async(req,res)=>{
    try{
        product = await Product.findByIdAndDelete(req.params._id)
        if(product){
            res.json(responseFunction(true,`Product with id ${req.params._id} deleted Successfully`,product))
        }
        else{
            res.json(responseFunction(false,`Product with id ${req.params._id} does not exists in database`,null))
        }
    }
    catch(error){
        res.json(responseFunction(false,error.message,null))
    }
}
const getProductById = async(req,res)=>{
    try{
        const product = await Product.findById(req.params._id)
        if(product){
            res.json(responseFunction(true,`Product with id ${req.params._id} fetched Successfully`,product));
        }
        else{
            res.json(responseFunction(false,`Product with id ${req.params._id} does not exists in database`,null))
        }
    }
    catch(error){
        res.json(responseFunction(false,error.message,null))
    }
    

}

module.exports = {
    updateProduct,
    deleteProduct,
    AddProduct,
    getProduct,
    getProductById
    
}

