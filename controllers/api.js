const { query } = require('express');
const products = require('../databases/data')
const responseFunction = require('../helpers/response')
const addProduct =async (req, res) => {
    try {
        const OldProduct = await products.some(product => product._id === Number(req.body._id))
        if (OldProduct) {
            const message= `Product with id ${req.body._id} already exists`
            return res.status(409).json(responseFunction(false, message,null ))
        }
        else {
            products.splice(products.length, 0, req.body);
            return res.status(200).json(responseFunction(true, `Product with id ${req.body._id} added Successfully`,products));
        }
    }
    catch (err) {
        res.status(500).json(responseFunction(false, err.message,null));

    }
}
const getProduct = async(req,res)=>{
    try{       
        const id = req.params._id;
        if(!id){
           return res.status(200).json(responseFunction(true, "Products Data Fetched Successfully",products))
        }
        const Product = await products.find((product)=>{
            if(product._id === Number(id)){
            return product;
            }
        })
        
        if(!Product){
            const message = `Product with id ${id} does not exist`;
            return res.status(404).json(responseFunction(false, message,null ));
        }
        res.status(200).json((true, `Product Data of ${id} Fetched Successfully`,Product));
    }
    catch(err){
        res.status(500).json(responseFunction(false, err.message,null ));
    }
} 

const updateData = async(req,res)=>{
    try{
        const id = req.params._id;
        const name = req.body.name;
        const Product = await products.find(product=>(product._id === Number(id)))
        if(!Product){
            message = `Product with id ${id} does nor exist so we cannot update it`;  
            return res.status(404).json(responseFunction(false, message,null ))
        }
        Product.name = name;
        res.status(200).json(responseFunction(true, `Product with id ${id} Updated Successfully`,Product))
    }
    catch(err){
        res.status(500).json(responseFunction(false, err.message,null ));
    }
};
const deleteData = (req,res)=>{
    try{
        const id = req.params._id;
        var index = products.findIndex(product=>(product._id === Number(id)))
        if(index !== -1){
            products.splice(index,1);
            res.status(200).json(responseFunction(true, `Product with id ${id} deleted  Successfully`,products));
        }
        else{
            const message = `Product with id ${id} does not exist so we cannot delete it`;
            return res.status(404).json(responseFunction(false, message,null ))

        }
    }
    catch(err){
        res.status(500).json(responseFunction(false, err.message,null ));
    }
}
const getPrice = (req,res)=>{
    try{ 
        const product_id = req.body._id
        const quantityToBuy = req.body.quantityToBuy
        const Product = products.find((product)=>{
            if(product._id === Number(product_id)){
                product.availableQuantity = product.availableQuantity - quantityToBuy
            return product;
            
            }
        })
        if(!Product){
            const message = `Product with id ${product_id} does not exist`;     
            res.status(400).json(responseFunction(false,  message,null ));
        }
        const Newproduct ={
            "_id": Product._id,
            "name": Product.name,
            "pricePerItem": Product.price,
            "totalPrice": Product.price * quantityToBuy,
            "quantity":quantityToBuy
        }
        res.status(200).json(responseFunction(true, `Product with id ${req.body._id} Updated  Successfully`,Newproduct));
    }
    catch(err){
        res.status(500).json(responseFunction(false, err.message,null ));
    }
}
module.exports = {
    updateData,
    deleteData,
    addProduct,
    getProduct,
    getPrice
};
