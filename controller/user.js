const { query } = require('express');
const responseFunction = require('../helpers/response')
const Product = require('../databases/mongodb/Product');

const AddProduct = (req, res,next) => {
   
    const product = new Product({
        "_id":req.body._id,
        "name":req.body.name,
        "price":req.body.price,
        "availableQuantity":req.body.availableQuantity,
        "manufacturer":req.body.manufacturer
    })
    product.save()
    .then(()=>{
         res.status(201).json(responseFunction(true,"Product added Successfully",product))
     })
        
    
    .catch((error)=>{
               res.status(400).json(responseFunction(false,error.message,null))
    })
    
    
 }
const getProduct = async(req,res)=>{
    try{
        const product = await Product.find()
        res.status(200).json(responseFunction(true,"Products fetched successfully",product));
    }
    catch{
        (error) => {
          res.status(400).json(responseFunction(false,error.message,null));
        }
    };
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
    catch {(error)=>{
        res.json(responseFunction(false,error.message,null))
    }}
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
    catch{(error)=>{
        res.json(responseFunction(false,error.message,null))
    }}
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
    catch{(error)=>{
        res.json(responseFunction(false,error.message,null))
        }
    }

}

module.exports = {
    updateProduct,
    deleteProduct,
    AddProduct,
    getProduct,
    getProductById
    
}

