const responseFunction = require("../../helpers/response");

const validation = (schema)=>{
    return (req, res, next) => { 
        const {error} = schema.validate(req);
        if(error){
            return res.json(responseFunction(false,error.message,null))
        }
        else{
            next();
        }
    }
}

module.exports = validation;