const { query } = require('express');
const responseFunction = require('../helpers/response')
const { findProductById, updateProductById } = require('../databases/mongo/operation/product')
const { findUserById } = require('../databases/mongo/operation/User');
const { findOrders, addOrder,getOrdersCountByUser,getOrdersCountbyProducts } = 
require('../databases/mongo/operation/order')
//const Order = require('../databases/mongo/models/order');

const placeOrder = async (req, res) => {
    try {
        const user = await findUserById(req.body.userId)

        if (user) {

            const product = await findProductById(req.body.productId)
            
            if (product) {
                if (product.availableQuantity >= Number(req.body.quantity)) {
                    const newquantity = product.availableQuantity - req.body.quantity
                    const roduct = await updateProductById(req.body.productId, {"availableQuantity":newquantity})
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

        const user = await findUserById(req.params.userId);

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
const getOrdersCountForEachUser = async(req,res)=>{
    try{
        var limit = Number(req.query.limit);
        var skip = (Number(req.query.page) - 1) * Number(limit);
        const orders = await getOrdersCountByUser(limit,skip)
        return res.json(responseFunction(true, `Details fetched successfully`, orders));
       

    }
    catch(error){
        res.json(responseFunction(false, error.message, null))
    }
}
const getOrdersCountForEachProduct = async(req,res)=>{
    try{
        var limit = Number(req.query.limit);
        var skip = (Number(req.query.page) - 1) * Number(limit);
        const orders = await getOrdersCountbyProducts(limit,skip)
        return res.json(responseFunction(true, `Details fetched successfully`, orders));
       }
    
    catch(error){
        res.json(responseFunction(false, error.message, null))
    }
}


module.exports = { placeOrder, getOrder , getOrdersCountForEachUser,getOrdersCountForEachProduct};