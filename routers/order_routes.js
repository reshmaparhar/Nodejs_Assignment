const express = require('express');
const app = express();
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schemas = require('../middlewares/validator/OrderSchema');
const PlaceOrder = require('../controller/o1')
router.route('/').post(validation(schemas.Place_Order),PlaceOrder)
module.exports = router;