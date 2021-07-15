const joi = require("joi");
const schema = {
    addNewUser :joi.object().keys({
       body : joi.object().keys({
        "mobileNumber":joi.string().length(10).pattern(/^[0-9]+$/).required(),
        "password": joi.string().min(8).max(16).required()
        
     })
    }).unknown()
}
module.exports = schema;