const express = require('express');
const router = express.Router();

const { schemas } = require('../middlewares/validator/schema')
const validation = require('../middlewares/validator/req_validation');

const { updateData,
    deleteData,
    addProduct,
    getProduct,
    getPrice
} = require('../controllers/api');

router.route('/').get(getProduct)
.post(validation(schemas.Add_Product), addProduct)

router.route('/:_id')
.get(validation(schemas.GetId),getProduct)
.delete(validation(schemas.GetId),deleteData)
.put(validation(schemas.EditProduct), updateData);

router.post('/price', validation(schemas.UpdateQuantity), getPrice)

module.exports = router;