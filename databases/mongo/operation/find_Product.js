const Product = require('../models/Product');
module.exports = async (productId)=>{         
    const product = await  Product.findById(productId)
    return product;
}
