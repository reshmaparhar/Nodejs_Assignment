const express = require('express');
const router = express.Router();
const products = require('../data')
const middleware = require('../middleware/req.body.validator');
const middleware1 = require('../middleware/req.params.validator');
const requestValidator = require("../middleware/requestValidator")

const { schemas } = require('../schema');

const { updateData,
    deleteData,
    addProduct,
    getProduct,
    getPrice
} = require('../controllers/api');
const { required } = require('joi');
router.route('/').get(getProduct)
router.route('/:_id')
    .get(middleware1(schemas.schema3), getProduct)
    .delete(middleware1(schemas.schema3), deleteData)
    .put(requestValidator(schemas.editProduct), updateData)
router.post('/price', middleware(schemas.schema2), getPrice)
router.post('/', middleware(schemas.schema1), addProduct)
module.exports = router;