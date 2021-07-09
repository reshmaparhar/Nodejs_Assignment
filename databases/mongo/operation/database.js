const mongoose = require("mongoose");
const {db} = require('../../../config/config');
const connectDB = async()=>{
  const conn = await mongoose.connect(db.uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
   console.log('Successfully connected to MongoDB ');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB ');
    console.error(error);
  });
}
module.exports = connectDB;