const joi = require("joi");

const schemas = {
    addNewProduct:joi.object().keys({
       body : joi.object().keys({
        "_id":joi.number().required(),
        "name": joi.string().required(),
        "price": joi.number().required(),
        "availableQuantity": joi.number().required(),
        "manufacturer": joi.string().required()
     })
    }).unknown(),
    getId:joi.object().keys({
        params:joi.object().keys({
        "_id": joi.number().required()
     })
    }).unknown()  ,
    editProduct:joi.object().keys({
        params: joi.object().keys({
        "_id": joi.number().required()
        }),
        body:joi.object().keys({
        "name": joi.string().required()
        })
    }).unknown()

}

module.exports = schemas;