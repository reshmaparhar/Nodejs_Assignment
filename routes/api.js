const express = require('express');
const router = express.Router();
const products = require('../data')


const {updateData,
deleteData,
addProduct,
getAllProducts,
getProductById,    
getPrice
}= require('../controllers/api1');   


router.get('/price',getPrice)
router.post('/add',addProduct);
router.get('/getalldata',getAllProducts);
router.get('/get/:id',getProductById);
router.post('/update/:id',updateData);
router.delete('/delete/:id',deleteData);

//router.route('/').get(getAllProducts).post(addProduct).put(updateData).delete(deleteData)

module.exports = router;