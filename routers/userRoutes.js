const express = require('express');
const router = express.Router();
const validation = require('../middlewares/validator/validation');
const schema = require('../middlewares/validator/userSchema');
const addUser = require('../controller/user');

router.route('/user').post(validation(schema.addNewUser),addUser);
module.exports = router;