const responseFunction = require('../../helpers/response')
const validation = (schema)=>{
    return((req,res,next)=>{
        const {error} = schema.validate(req) ;
        if(error){
            res.json(responseFunction());
        }
        else{
            next();
        }
    })
}
