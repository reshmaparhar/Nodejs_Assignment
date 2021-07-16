const express = require('express');
const app = express();
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schemas = require('../middlewares/validator/schema');
const multer = require('multer')
const path = require('path')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,`../images/uploadedImages`)
      );

    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);

    },
  });
  const upload = multer({ storage: multerStorage});

const {addProduct, updateProduct,deleteProduct,getProduct,getProductById}= require('../controller/product.js');
router.route('/getProduct').get(getProduct);
router.route('/product').post(upload.single("myFile"),validation(schemas.addNewProduct),addProduct);
router.route('/:_id').get(validation(schemas.getId),getProductById).delete(validation(schemas.getId),deleteProduct).put(validation(schemas.editProduct),updateProduct);
module.exports = router;