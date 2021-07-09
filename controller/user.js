const { query } = require('express');
const responseFunction = require('../helpers/response')
const User = require('../databases/mongo/models/user')
const mongoose = require('mongoose');
const AddUser = (req, res) => {

    
       const user = new User({
            
            "_id":mongoose.Types.ObjectId(),
            "mobileNumber":req.body.mobileNumber,
            "password":req.body.password
        })
       user.save()
        .then (()=>{
             return res.status(201).json(responseFunction(true,"User added Successfully",user));
        }
         )
        .catch((error)=>{
                return res.status(400).json(responseFunction(false,error.message,null))
        })
        
        /*try{
            const user = new User({
                
                "_id":mongoose.Types.ObjectId(),
                "mobileNumber":req.body.mobileNumber,
                "password":req.body.password
            })
            user.save()
            return res.status(201).json(responseFunction(true,"User added Successfully",user));
        }
        catch{(error)=>{
            return res.status(400).json(responseFunction(false,error.message,null));
        }}*/
     
  }

  module.exports = AddUser;