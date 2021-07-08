const upper = require('../helpers/uppercase')
const responseFunction = require('../helpers/response')
const hello = (req,res)=>{
    const data = upper(req.query.name);
    message = `hello ${ upper(data)}`  ;
    return res.json(responseFunction(true,"Name converted to upper case successfully",data));
}
module.exports = hello;