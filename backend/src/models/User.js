const mongoose = require('mongoose');
const {Schema}= mongoose;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto')

const UserSchema = new Schema({
    email:{type:String,lowercase:true},
    nombre:{type:String},
    password:{type:String},
    signupDate:{type:Date,dafault:Date.now()},
    lastLogin:{type:Date}

});

UserSchema.pre('save',(next)=>{
    let user = this
    console.log(user)
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next('error en hashear'+err);
        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if(err) return next(err);
            user.password=hash;
            next()
        })
    })
})

UserSchema.method.gravatar= function (){
    if(!this.email) return 'https://gravatar.com/avatar/?s=200Gd=retro'
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200Gd=retro`

}

module.exports = mongoose.model('User',UserSchema);

