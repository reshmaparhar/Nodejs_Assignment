
const Order = require('../models/Order');
const findOrders = async(id,limit,skip)=>{
    const orders = await Order.find(id).skip(skip).limit(limit).populate({path:'productId',select:'name'}).exec();
    return orders;
 }
const addOrder = async(order)=>{
    const neworder = new Order(order);
    await neworder.save()
    return neworder
}
module.exports = {
    findOrders,
    addOrder
}