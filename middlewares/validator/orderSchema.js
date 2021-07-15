const joi = require("joi");

const schemas = {
    placeOrder:joi.object().keys({
       body : joi.object().keys({
        "productId": joi.number().required(),
        "quantity": joi.number().required()
        
     }).unknown(),
    }).unknown(true),
    getOrder:joi.object().keys({
        params:joi.object().keys({
        "userId": joi.string().required()
        }),
        query:joi.object().keys({
            "page":joi.number().required(),
            "limit":joi.number().required()  
        })

    }).unknown(),
    getCount:joi.object().keys({
        
        query:joi.object().keys({
            "page":joi.number().required(),
            "limit":joi.number().required()  
        })

    }).unknown()
}
module.exports = schemas;