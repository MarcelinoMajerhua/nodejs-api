const mongoose = require('mongoose');
const {Schema}= mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email:{type:String,lowercase:true},
    nombre:{type:String},
    password:{type:String},
    signupDate:{type:Date,dafault:Date.now()},
    lastLogin:{type:Date}

});

UserSchema.methods.encryptPassword= async (password)=>{
    return bcrypt.hashSync(password,this.password);
}

UserSchema.methods.comparePassword= function (password){
    return bcrypt.compareSync(password,this.password);
}




module.exports = mongoose.model('User',UserSchema);

