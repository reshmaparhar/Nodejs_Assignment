const joi = require("joi");

const schemas = {
    Add_Product:joi.object().keys({
       body : joi.object().keys({
        "_id":joi.number().required(),
        "name": joi.string().required(),
        "price": joi.number().required(),
        "availableQuantity": joi.number().required(),
        "manufacturer": joi.string().required()
     })
    }).unknown(),

    UpdateQuantity:joi.object().keys({

        body :joi.object().keys({
        "_id": joi.number().required(),
        "quantityToBuy":joi.number().required()
        }),
    }).unknown(),
    GetId:joi.object().keys({
        params:joi.object().keys({
        "_id": joi.number().required()
     })
    }).unknown()  ,
    EditProduct:joi.object().keys({
        params: joi.object().keys({
        "_id": joi.number().required()
        }),
        body:joi.object().keys({
        "name": joi.string().required()
        })
    }).unknown()

}

module.exports = {schemas};