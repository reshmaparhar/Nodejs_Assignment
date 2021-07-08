const express = require('express');
const app = express();
const router = express.Router();
const hello = require('../controller/hello');
router.route('/:id').get(hello);
module.exports = router;