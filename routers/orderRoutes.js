const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schemas = require('../middlewares/validator/orderSchema');
const {placeOrder,getOrder,getOrdersCountForEachUser,getOrdersCountForEachProduct} = require('../controller/order')

router.route('/').post(validation(schemas.placeOrder),placeOrder)
router.route('/orderscountbyuser').get(validation(schemas.getCount),getOrdersCountForEachUser)
router.route('/orderscountbyproduct').get(validation(schemas.getCount),getOrdersCountForEachProduct)
router.route('/:userId').get(validation(schemas.getOrder),getOrder);


module.exports = router;