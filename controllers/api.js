const { query } = require('express');
let products = require('../data')
const Joi = require('joi') 
const joi = require("joi");
const validation = joi.object({
     "_id": joi.number().required(),
     "name": joi.string().required(),
     "price": joi.number().required(),
     "availableQuantity": joi.number().required(),
     "manufacturer": joi.string().required()
})
const options = {
    abortEarly: false, 
    allowUnknown: true,
    stripUnknown: true 
};
const addProduct =async(req,res)=>{    
    try{
        const { error, value } = validation.validate(req.body,options);
        if (error) {
            return res.send(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        } 
        const OldProduct = await products.some(product => product._id === Number(req.body._id))
        if(OldProduct){
            const error = `Product with id ${req.body._id} Already exists`
            return res.json({success:false,message:error})
        }
        else{
            products.splice(products.length, 0,req.body);
            return res.status(200).json({success:true, data :products});
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
const getProduct = async(req,res)=>{
    try{       
        const id = req.params.id;
        if(!id){
            return res.status(200).json({
                success:true,
                data:products
            })
        }
        const Product = await products.find((product)=>{
            if(product._id === Number(id)){
            return product;
            }
        })
        
        if(!Product){
            return res.status(404).json({success:false,msg:`Product with id ${id} does not exist`});
        }
        res.status(200).json({success:true,data : Product});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
} 

const updateData = async(req,res)=>{
    try{
        const id = req.query.id;
        const name = req.query.name;
        const Product = await products.find(product=>(product._id === Number(id)))
        if(!Product){
            return res.status(401).json({success:false,message:`Product with id ${id} does nor exist so we cannot update it`})
        }
        const newProduct = await products.map((product)=>{
            if(product._id === Number(id)){
                product.name = name
                
            }
            return product;
        })
        res.status(200).json({success:true,data:newProduct})
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
};
const deleteData = (req,res)=>{
    try{
        const id = req.query.id;
        var index = products.findIndex(product=>(product._id === Number(id)))
        if(index !== -1){
            products.splice(index,1);
            res.status(200).json({success:true,data :products});
        }
        else{
            return res.status(401).json({success:false,message:`Product with id ${id} does nor exist so we cannot delete it`})

        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
const getPrice = (req,res)=>{
    try{ 
        const product_id = req.query.product_id
        const quantityToBuy = req.query.quantityToBuy
        const Product = products.find((product)=>{
            if(product._id === Number(product_id)){
                product.availableQuantity = product.availableQuantity - quantityToBuy
            return product;
            
            }
        })
        if(!Product){
            res.status(404).json({success:false,msg:`Product with id ${product_id} does not exist`});
        }
        const Newproduct ={
            "_id": Product._id,
            "name": Product.name,
            "pricePerItem": Product.price,
            "totalPrice": Product.price * quantityToBuy,
            "quantity":quantityToBuy
        }
        res.status(200).json({success:true,data : Newproduct});
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
}
module.exports = {
    updateData,
    deleteData,
    addProduct,
    getProduct,
    getPrice
};
