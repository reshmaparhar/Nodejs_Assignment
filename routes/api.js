const express = require('express');
const router = express.Router();
const products = require('../data')
const middleware = require('../req.body.validator'); 
const middleware1 = require('../req.params.validator'); 

const {schemas} = require('../schema'); 

const {updateData,
deleteData,
addProduct,
getProduct,    
getPrice
}= require('../controllers/api');   
router.route('/').get(getProduct)
router.route('/:_id',middleware1(schemas.schema2)).get(getProduct).delete(deleteData)
router.route('/:_id/:name',middleware1(schemas.schema4)).put(updateData)
router.post('/price',middleware(schemas.schema2),getPrice)
router.post('/',middleware(schemas.schema1),addProduct)
module.exports = router;