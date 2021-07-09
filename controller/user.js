const { query } = require('express');
const responseFunction = require('../helpers/response')
const User = require('../databases/mongo/models/user')
const mongoose = require('mongoose');
const AddUser = async(req,res)=>{

        try{
           
            const user = new User({
                
                "_id":mongoose.Types.ObjectId(),
                "mobileNumber":req.body.mobileNumber,
                "password":req.body.password
                })
            await user.save()
            return res.status(201).json(responseFunction(true,"User added Successfully",user));
        }
        catch(error){
            if(error.code === 11000){
                return res.status(400).json(responseFunction(false,"User with this Phone Number already exists in database",null));
            }
            return res.status(400).json(responseFunction(false,error,null));
        }
     
  }

  module.exports = AddUser;