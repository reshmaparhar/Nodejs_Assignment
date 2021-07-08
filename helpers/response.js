const responseFunction = (check,msg,data)=>{
    return {success:check,message:msg,data};
}
module.exports = responseFunction;