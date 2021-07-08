const Joi = require('joi');
const middleware1 = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req);
        if (error) {
            res.status(404).json({ "success": false, error: error.message })
        } else {
            next();
        }
    }
}
module.exports = middleware1;