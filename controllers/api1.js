const { query } = require('express');
let products = require('../data')

const addProduct = (req,res)=>{
    const Product = req.body;
    const {id,name,price,availableQuantity,manufacturer} = req.body
    try{            
        if(id && name && price && availableQuantity && manufacturer){

            const OldProduct = products.some(product => product._id === Number(req.body.id))
            if(OldProduct){
                const error = new Error(`Product with id ${req.body.id} Already exists`)
                throw error;
            }
            else{
                products.splice(products.length, 0,Product);
                return res.status(200).json({success:true, data :products});
            }
        }
        else{
            const error = new Error('Please Provide valid details')
            throw error;
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
    
}

const getAllProducts = 
(req,res)=>{
    res.status(200).json({
        success:true,
        data:products
    })
}
const getProductById = async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(products.length)
        console.log(products);
        var index = await products.findIndex(product=> {
            if(product._id === Number(id))
                return product})
        if(index !== -1){
            return res.status(200).json({
                        success:true, 
                        data:products[index]
            })  
        }
        else{
            const error = new Error(`Product with id ${req.params.id} does not  exists`)
            throw error
        }
    }
    catch(err){
            res.status(500).json({ message: err.message });
    }
} 


const updateData = async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(products.length)
        var index = await products.findIndex(product=> {
            if(product._id === Number(id))
            return product})
        
       if(index !== -1){
            Product = await products.map((product)=>{
                if(product._id === Number(id)){
                    product.name = req.body.name
                    
                }
                return product;
            })
            res.status(200).json({ success: true, data: products })
       }
        else{
            const error = new Error(`Product with id ${req.params.id} does not  exists`)
            throw error
        }
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
       
};
const deleteData = async(req,res)=>{
    try{              
        const id = req.params.id;
        var index = await products.findIndex(product=> {
            if(product._id === Number(id))
            return product})
        console.log(index)
        await products.splice(index,1);
        res.status(200).json({success:true,data :products});
    }
    catch(err){
        res.status(500).json({ message: err.message });

    }
}
const getPrice = async(req,res)=>{
    try{
        const product_id = req.query.product_id
        
        const quantityToBuy = req.query.quantityToBuy
        const Product = products.find((product)=>{
            if(product._id === Number(product_id)){
                product.availableQuantity = product.availableQuantity - quantityToBuy
            return product;
            
            }
        })
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
    getAllProducts,
    getProductById,
    getPrice
}
