const responseFunction = (Bit,msg,data)=>{
    if(Bit) return {success :Bit,message:msg,data:data};
    else return {success:Bit,message:msg,data};
}
module.exports = responseFunction