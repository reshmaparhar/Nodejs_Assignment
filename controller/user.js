const { query } = require('express');
const responseFunction = require('../helpers/response')
const mongoose = require('mongoose');
const { addNewUser } = require('../databases/mongo/operation/User');
const addUser = async (req, res) => {

    try {
       
        const user = await addNewUser(req.body)
        if (user) {
            return res.status(201).json(responseFunction(true, "User added Successfully", user))
         }     
        else {
            return res.status(400).json(responseFunction(false, "User already exists in database", null));

        }
    }
    catch (error) {
        return res.status(400).json(responseFunction(false, error.message, null));
    }

}

module.exports = addUser;