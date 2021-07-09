const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schema = require('../middlewares/validator/userSchema');
const AddUser = require('../controller/user');

router.route('/user').post(validation(schema.Add_User),AddUser);
module.exports = router;