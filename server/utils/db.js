const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

//method to connect to mongodb
const connectToMongoDB = async() =>{
    try{
        const isConnect = await mongoose.connect(MONGODB_URI);
        if(!isConnect) throw new Error('Coulnot connect to DB');
        return "Connected Successfully";
    }catch(err){
        return err;
    }
}
module.exports = connectToMongoDB;