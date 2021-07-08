const responseFunction = (check,msg,data)=>{
    if(Bit) return {success :check,message:msg,data:data};
    else return {success:check,message:msg,data};
}
module.exports = responseFunction;