const { query } = require('express');
const responseFunction = require('../helpers/response')
const { findproductbyid, UpdateProduct } = require('../databases/mongo/operation/Product')
const { finduserbyid } = require('../databases/mongo/operation/User');
const { findOrders, addOrder,getorderscountbyuser } = 
require('../databases/mongo/operation/order')
const Order = require('../databases/mongo/models/Order');

const PlaceOrder = async (req, res) => {
    try {
        const user = await finduserbyid(req.body.userId)

        if (user) {

            const product = await findproductbyid(req.body.productId)
            
            if (product) {
                if (product.availableQuantity >= Number(req.body.quantity)) {
                    const newquantity = product.availableQuantity - req.body.quantity
                    const roduct = await UpdateProduct(req.body.productId, {"availableQuantity":newquantity})
                    const order = {
                        "orderCreatedBy": req.body.userId,
                        "productId": req.body.productId,
                        "quanity": req.body.quantity,
                        "totalCost": (req.body.quantity * product.price)
                    }
                    const neworder = await addOrder(order);
                    return res.json(responseFunction(true, `Order Placed Successfully`, neworder))
                }
                else {

                    return res.json(responseFunction(false, `Sorry !! Available quantity of product is less than required quantity`, null))
                }
            }
            else {
                return res.json(responseFunction(false, `Sorry !! Product with this id does not exists in database`, null))
            }
        }
        else {
            return res.json(responseFunction(false, `Sorry !! user with this id does not exists in database`, null))
        }
    }
    catch (error) {
        res.json(responseFunction(false, error.message, null))
    }
};
const getOrder = async (req, res) => {
    try {

        var limit = Number(req.query.limit);
        var skip = (Number(req.query.page) - 1) * Number(limit);

        const user = await finduserbyid(req.params.userId);

        if (user) {
            const orders = await findOrders({ 'orderCreatedBy': req.params.userId },limit,skip)
            return res.json(responseFunction(true, `Details fetched successfully`, orders));
        }
        else {
            return res.json(responseFunction(false, `Sorry !! user with this id does not exists in database`, null))
        }
    }
    catch (err) {
        res.json(responseFunction(false, error.message, null))
    }
}
const getOrdersCountbyUser = async(req,res)=>{
    try{
        var limit = Number(req.query.limit);
        var skip = (Number(req.query.page) - 1) * Number(limit);
        const orders = await Order.aggregate([
            
                {$group:{ _id :"$orderCreatedBy",count:{$sum:1}}},
                {$skip:skip},
                {$limit:limit}
            ])
            return res.json(responseFunction(true, `Details fetched successfully`, orders));
       

    }
    catch(error){
        res.json(responseFunction(false, error.message, null))
    }
}
const getOrdersCountbyProducts = async(req,res)=>{
    try{
        var limit = Number(req.query.limit);
        var skip = (Number(req.query.page) - 1) * Number(limit);
        var lookup =  {
            $lookup:{
            from: "products", 
            localField:"productId", 
            foreignField:"_id",
            as:'myCustomResult'},
        }
        const orders = await Order.aggregate([
               lookup,
               {

                  $group:{ _id :{"productId":"$productId","name":"$myCustomResult.name"},orderscount:{$sum:1}}
              },
                
                {$skip:skip},
                {$limit:limit},
                
        ])
        
        return res.json(responseFunction(true, `Details fetched successfully`, orders));
       }
    
    catch(error){
        res.json(responseFunction(false, error.message, null))
    }
}


module.exports = { PlaceOrder, getOrder , getOrdersCountbyUser,getOrdersCountbyProducts};