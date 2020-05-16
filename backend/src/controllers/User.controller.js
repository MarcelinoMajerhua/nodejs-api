const authCtrl ={};

const User = require('../models/User')
const service = require('../../services')
authCtrl.signUp=async (req,res)=>{
    const {email,nombre,password} = req.body;
    const user = new User({email,nombre,password});

    await user.save((err)=>{
        if(err) res.status(500).send({mensaje:'Error al crear usuario'});
        return res.status(201).send({token:service.createToken(user)});
    });
}

authCtrl.signIn=(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({mensaje:err})
        if(!user) return res.status(404).send({mensaje:'no existe usuario'})

        req.user =user
        console.log(req.user)
        res.status(200).send({
            mensaje:'estas logueado',
            token: service.createToken(user)
        })
    })
}


module.exports = authCtrl;
