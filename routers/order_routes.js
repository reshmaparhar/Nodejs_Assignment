const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schemas = require('../middlewares/validator/OrderSchema');
const {PlaceOrder,getOrder,getOrdersCountbyUser,getOrdersCountbyProducts} = require('../controller/order')

router.route('/').post(validation(schemas.Place_Order),PlaceOrder)
router.route('/orderscountbyuser').get(validation(schemas.Get_Count),getOrdersCountbyUser)
router.route('/orderscountbyproduct').get(validation(schemas.Get_Count),getOrdersCountbyProducts)
router.route('/:userId').get(validation(schemas.Get_Order),getOrder);


module.exports = router;