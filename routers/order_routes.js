const express = require('express');
const app = express();
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schemas = require('../middlewares/validator/OrderSchema');
const {PlaceOrder,getOrder} = require('../controller/order')
router.route('/').post(validation(schemas.Place_Order),PlaceOrder)
router.route('/:userId').get(validation(schemas.Get_Order),getOrder);
module.exports = router;