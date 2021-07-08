const Joi = require('joi'); 
const middleware1 = (schema, property) => { 
    return (req, res, next) => { 
    const { error } = schema.validate(req.params); 
    const valid = error == null; 
  
    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
      res.status(404).json({"success":false, error: message }) } 
    } 
  } 
module.exports = middleware1;