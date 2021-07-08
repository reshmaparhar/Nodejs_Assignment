const hello = require('../controller/hello');
const express = require('express');
const router = express.Router();
router.route('/reshma/:id').get(hello);
module.exports = router