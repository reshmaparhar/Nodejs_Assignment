const { query } = require('express');
let products = require('../data')

const addProduct = (req,res)=>{
    const Product = req.body;
    const {id,name,price,availableQuantity,manufacturer} = req.body
    try{            
    
        if(id && name && price && availableQuantity && manufacturer){
            const Product = {
                "_id": id,
                "name": name,
                "price": price,
                "availableQuantity": availableQuantity,
                "manufacturer": manufacturer
            }
            const OldProduct = products.find((product)=>{
                if(product._id === Number(req.body.id)){
                return product;
                
                }
            })
            if(OldProduct){
                return res.status(200).json({success:true,message: `Product with id ${id} Already exists`});
            }
            else{
                //products.push(Product);
                products.splice(products.length, 0,Product);
                res.status(200).json({success:true, data :products});
            }
        }
        else{
           return res.status(200).json({success:false,message: 'Please Provide valid details'});
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
const getProductById = (req,res)=>{
        const id = req.params.id;
        const Product = products.find((product)=>{
            if(product._id === Number(id)){
              return product;
            }
        })
        if(!Product){
            return res.status(404).json({success:false,msg:`Product with id ${id} does not exist`});
        }
         res.status(200).json({success:true,data : Product});
}
const updateData = async(req,res)=>{
    try{
        const id = req.query.id;
        const name = req.query.name 
        var index = await products.findIndex(product=> {
            if(product._id === Number(id))
            return product})
        products[index].name = name ;
        res.status(200).json({ success: true, data: products })
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
       
};
const deleteData = async(req,res)=>{
    try{              
        const id = req.params.id;
        var index =  await products.findIndex(product=> {
            if(product._id === Number(id))
            return product})
        products.splice(index,1);
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
        const Product = await products.find((product)=>{
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
