const express = require('express');
const router = express.Router();
const products = require('../data')


const {updateData,
deleteData,
addProduct,
getProduct,    
getPrice
}= require('../controllers/api');   

router.route('/getalldata/:id?').get(getProduct)
router.route('/').get(getPrice).post(addProduct).put(updateData).delete(deleteData)
module.exports = router;