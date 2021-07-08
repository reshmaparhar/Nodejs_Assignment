const responseFunction = (checkBit,msg,data)=>{
    if(checkBit) return {success :checkBit,message:msg,data:data};
    else return {success:checkBit,message:msg,data};
}
module.exports = responseFunction;