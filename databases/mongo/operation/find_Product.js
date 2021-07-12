const findproduct = (productId)=>{
    const mongoose = require('mongoose');
const Product =  require('../models/Product')         
const product =  Product.findById(productId)
if(product){
    //console.log(product)
    return product;
}
else{
    return res.json(responseFunction(false,`Sorry !! User with this id does not exists in database`,null))
}

}
module.exports= findproduct;