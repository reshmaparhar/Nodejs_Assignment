const { query } = require('express');
const responseFunction = require('../helpers/response')
const Product = require('../databases/mongo/models/Product');
const {findproduct,
    findproductbyid,
    UpdateProduct,
    deleteproduct,
    addproduct} = require('../databases/mongo/operation/Product')
const AddProduct = async(req, res) => {
   try{
       
        const product = await addproduct(req.body)
        if(product){
            return res.status(201).json(responseFunction(true,"Product added Successfully",product))
        }
        else{
            return res.status(400).json(responseFunction(false,"Product already exists in database",null));
        }
     
   }
    catch(error){
        res.status(400).json(responseFunction(false,error.message,null));
        
    }
}

const getProduct = async(req,res)=>{
    try{
        const product = await findproduct();
        res.status(200).json(responseFunction(true,"Products fetched successfully",product));
    }
    catch(error){
          res.status(400).json(responseFunction(false,error.message,null));
    }
    
} 

const updateProduct = async(req,res)=>{
    try{
        product = await UpdateProduct(req.params._id,{"name":req.body.name})
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
        product = await deleteproduct(req.params._id)
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
        const product = await findproductbyid(req.params._id)
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

