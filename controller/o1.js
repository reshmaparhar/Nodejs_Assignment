const responseFunction = require('../helpers/response')
const Product = require('../databases/mongo/models/Product');
const User = require('../databases/mongo/models/user')
const { query } = require('express');
const Order = require('../databases/mongo/models/Order');
const finduser = require('../databases/mongo/operation/find_user')
const findproduct = require('../databases/mongo/operation/find_Product')
const updateProduct = require('../databases/mongo/operation/UpdateProduct');
const PlaceOrder =async(req,res)=>{
    try{
        const user = await finduser(req.body.userId)
        
        if(user){
        
            const product = await findproduct(req.body.productId)
            
            if(product){
                if(product.availableQuantity >= Number(req.body.quantity)){
                        const newquantity = product.availableQuantity - req.body.quantity
                        await updateProduct(req.body.productId,newquantity)
                        const order = new Order({
                                    "orderCreatedBy":req.body.userId,
                                    "productId":req.body.productId,
                                    "quanity":req.body.quantity,
                                    "totalCost":(req.body.quantity * product.price)
                        })
                        await order.save()
                        return res.json(responseFunction(true,`Order Placed Successfully`,order))
                }
                else{
                
                    return res.json(responseFunction(false,`Sorry !! Available quantity of product is less than required quantity`,null))
                }
            }
            else{
                return res.json(responseFunction(false,`Sorry !! Product with this id does not exists in database`,null))
            }
        }
        else{
            return res.json(responseFunction(false,`Sorry !! user with this id does not exists in database`,null))
        }
    }
    catch(error){
        res.json(responseFunction(false,error.message,null))
    }
};
module.exports = PlaceOrder;