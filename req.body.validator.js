const Joi = require('joi'); 
const middleware = (schema, property) => { 
  return (req, res, next) => { 
  const { error } = schema.validate(req.body); 
  const valid = error == null; 

  if (valid) { 
    next(); 
  } else { 
    const { details } = error; 
    const message = details.map(i => i.message).join(',');
    res.status(400).json({"success":false, error: message }) } 
  } 
} 
 
module.exports = middleware;