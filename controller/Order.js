const responseFunction = require('../helpers/response')
const Product = require('../databases/mongo/models/Product');
const User = require('../databases/mongo/models/user')
const { query } = require('express');
const Order = require('../databases/mongo/models/Order');


const PlaceOrder = async (req, res) => {
    try {

        const user = await User.findById(req.body.userId);

        if (user) {
            const product = await Product.findById(req.body.productId)

            if (product) {

                if (product.availableQuantity >= Number(req.body.quantity)) {
                    const newquantity = product.availableQuantity - req.body.quantity
                    await Product.findByIdAndUpdate(req.body.productId, { "availableQuantity": newquantity }, { new: true })
                    const order = new Order({
                        "orderCreatedBy": req.body.userId,
                        "productId": req.body.productId,
                        "quanity": req.body.quantity,
                        "totalCost": (req.body.quantity * product.price)
                    })


                    await order.save()
                    return res.json(responseFunction(true, `Order Placed Successfully`, order))
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
}
const getOrder = async (req, res) => {
    try {
        const orderDetails = [];
        var limit = Number(req.query.limit);
        var skip = (Number(req.query.page) - 1) * Number(limit);
        
        const user = await User.findById(req.params.userId);
        if (user) {
            const order_detail = {};
            const orders = await Order.find({'orderCreatedBy': req.params.userId}).skip(skip).limit(limit);
            for (var i in orders) {
                order_detail.order = orders[i];
                product = await Product.findById(orders[i].productId);
                order_detail.productName = product.name;
                orderDetails.push(order_detail);
            }
            return res.json(responseFunction(true, `Details fetched successfully`, orderDetails));
        }
        else {
            return res.json(responseFunction(false, `Sorry !! user with this id does not exists in database`, null))
        }
    }
    catch (err) {
        res.json(responseFunction(false, error.message, null))
    }
}

module.exports = { PlaceOrder, getOrder };