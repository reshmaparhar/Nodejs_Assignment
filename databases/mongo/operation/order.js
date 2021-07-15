
const Order = require('../models/Order');
const mongoose = require('mongoose');

const findOrders = async(id,limit,skip)=>{
    const orders = await Order.find(id).skip(skip).limit(limit).populate({path:'productId',select:'name'}).exec();
    return orders;
 }
const addOrder = async(order)=>{
    const neworder = new Order(order);
    await neworder.save()
    return neworder
}
/*const getorderscountbyuser = async(userId,skip,limit)=>{
    const orders = await Order.aggregate([
        {$match:{orderCreatedBy:mongoose.Types.ObjectId(userId)}},
        {$group:{ _id :"$orderCreatedBy",count:{$sum:1}}},
        //{$skip:skip},
        {$limit:limit}
    ])

    return orders;
}*/
module.exports = {
    findOrders,
    addOrder,
    //getorderscountbyuser
}