const { query } = require('express');
let products = require('../data')

const addProduct = (req,res)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const availableQuantity = req.body.availableQuantity
    const manufacturer = req.body.manufacturer
  
    if(id && name && price && availableQuantity && manufacturer){
        const Product = {
            "_id": id,
            "name": name,
            "price": price,
            "availableQuantity": availableQuantity,
            "manufacturer": manufacturer
        }
        const OldProduct = products.find((product)=>{
            if(product._id === Number(req.query.id)){
              return product;
              
            }
        })
        
        if(OldProduct){
            return res.status(200).json({success:true,message: `Product with id ${id} Alreadye exists`});
        }
        else{
            products.push(Product);
            
            res.status(200).json({success:true, data :products});
        }
    }
    else{
        return res.status(200).json({success:true,message: 'Please Provide valid details'});
    }
    
}
const getAllProducts = (req,res)=>{
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

const updateData = (req,res)=>{
    const id = req.query.id;
    const name = req.query.name;
    
    const Product = products.find(product=>(product._id === Number(id))product)
    if(!Product){
        return res.status(401).json({success:false,message:`Product with id ${id} does nor exist so we cannot update it`})
    }
    const newProduct = products.map((product)=>{
        if(product._id === Number(id)){
            product.name = name
            
        }
        return product;
    })
    res.status(200).json({success:true,data:newProduct})
};
const deleteData = (req,res)=>{
    const id = req.params.id;
    
    Product = products.find(product=>(product._id === Number(id))product)
    var index = products.findIndex(product=>(product._id === Number(id))product)
    products.splice(index,1);
    /*var newproducts = new Array();

        
        for (var i = 0; i < products.length; i++) {
          if (products[i]) {
            newproducts.push(products[i]);
          }
        }
    products = newproducts;*/
    
    /*const newProduct = products.filter((product)=>{
        if(product._id !== Number(id)){
          return product;
          
        }
    })*/
    res.status(200).json({success:true,data :products});

}
const getPrice = (req,res)=>{

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



module.exports = {
    updateData,
    deleteData,
    addProduct,
    getAllProducts,
    getProductById,
    getPrice
};
