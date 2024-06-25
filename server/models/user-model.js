const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    username : {
        type : String,
        requied : true
    },
    password : {
        type : String,
        required : true
    },
    projects : [{
        projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Project'
        }
    }]
});
UserSchema.statics.hashPassword = async function(password){
    const saltRounds = 10;
    try{
        return await bcrypt.hash(password, saltRounds);
    }catch(err){
        console.error('Error hashing password : ', err.message);
        throw new Error('Password hashing failed');
    }
}
UserSchema.methods.comparePassword = async function(userpassword){
    try{

        return await bcrypt.compare(userpassword, this.password)
    }catch(err){
        console.error('Error comparing password : ',error);
        throw new Error('Password comparison failed.')
    }
}
UserSchema.methods.generateToken = function(){
   
    const payload = {
        id : this._id,
        name : this.name,
        username : this.username
    };
    const secretKey = process.env.JWT_SECRET;
    const options = {expiresIn : '1h'};
    try{
        return jwt.sign(payload, secretKey, options);
    }catch(err){
        console.error("Error generating token  ",err.message);
        throw new Error('Token generation failed');
    }
}
const User = mongoose.model('User',UserSchema);
module.exports = User;