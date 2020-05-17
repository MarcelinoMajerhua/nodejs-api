const authCtrl ={};

const User = require('../models/User')
const service = require('../../services')
authCtrl.signUp=async (req,res)=>{
    const {email,nombre,password} = req.body;
    const user = new User({email,nombre,password});

    user.password= await user.encryptPassword(password);
    await user.save((err)=>{
        if(err) return res.status(500).send({mensaje:'Error al crear el usuario'})
        return res.status(200).send({token: service.createToken(user)})
    });
}

authCtrl.signIn=(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({mensaje:err})
        if(!user) return res.status(404).send({mensaje:'no existe usuario'})

        const match = user.comparePassword(req.body.password,(err)=>{
            if(err) return
        })

        if(match){
            req.user =user
            res.status(200).send({
            mensaje:'estas logueado',
            token: service.createToken(user)
            })
        }else{
            res.status(404).send({mensaje:'La contraseña es incorrecta'})
        }

        
    })
}


module.exports = authCtrl;
