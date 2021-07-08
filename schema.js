const Joi = require('joi')
const joi = require("joi");

const schemas = {
    schema1: Joi.object().keys({
        "_id": joi.number().required(),
        "name": joi.string().required(),
        "price": joi.number().required(),
        "availableQuantity": joi.number().required(),
        "manufacturer": joi.string().required()
    }),
    schema2: Joi.object().keys({
        "_id": joi.number().required(),
        "quantityToBuy": joi.number().required()
    }
    ),
    schema3: Joi.object().keys({
        "_id": joi.number().required()
    }),
    schema4: Joi.object().keys({
        "name": joi.string().required()
    }),
    editProduct: joi.object().keys({
        body: joi.object().keys({
            name: joi.string().required()
        }),
        params: joi.object().keys({
            _id: joi.number().required()
        }).unknown()
    }).unknown(),
    getProduct: joi.object().keys({
        params: joi.object().keys({
            _id: joi.number().optional()
        })
    })
}


module.exports = { schemas };