
const mongoose = require('mongoose');
const Order = require('../models/order')
const findOrders = async(id,limit,skip)=>{
    const orders = await Order.find(id).skip(skip).limit(limit).populate({path:'productId',select:'name'}).exec();
    return orders;
 }
const addOrder = async(order)=>{
    const neworder = new Order(order);
    await neworder.save()
    return neworder
}
const getOrdersCountByUser = async(limit,skip)=>{
    const orders =  await Order.aggregate([
            
        {$group:{ _id :"$orderCreatedBy",count:{$sum:1}}},
        {$skip:skip},
        {$limit:limit},
        {$sort:{"count":-1}}
    ])
    

    return orders;
}
const getOrdersCountbyProducts = async(limit,skip)=>{
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
         {$sort:{"orderscount":-1}}
         
    ])
   
    

    return orders;
}
module.exports = {
    findOrders,
    addOrder,
    getOrdersCountByUser,
    getOrdersCountbyProducts
}