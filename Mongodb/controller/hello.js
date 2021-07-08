const upper = require('../helpers/uppercase')
const hello = (req,res)=>{
    const data = upper(req.query.name);
    console.log(req.params)
    message = `hello ${ upper(data)}`  ;
    return res.json({success:true,data:data});
}
module.exports = hello;