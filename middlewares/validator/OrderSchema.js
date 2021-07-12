const joi = require("joi");

const schemas = {
    Place_Order:joi.object().keys({
       body : joi.object().keys({
        "productId": joi.number().required(),
        "quantity": joi.number().required()
        
     }).unknown(),
    }).unknown(true),
}
module.exports = schemas;