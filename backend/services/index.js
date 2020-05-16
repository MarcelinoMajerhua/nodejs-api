funcionesJwt = {};

const jwt = require('jwt-simple');
const moment = require('moment')
const config=require('../src/config');

funcionesJwt.createToken =(user)=>{
    const payload = {
        sub: user._id,
        iat: moment().unix(), //fecha en la que se creo el toen 
        exp: moment().add(14,'days').unix(), //expiracion del token 
    }

    return jwt.encode(payload,config.SECRET_TOKEN)
}

funcionesJwt.decodeToken =(token)=>{
    const decoded = new Promise((resolve,reject)=>{
        try {
            const payload =  jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    mensaje: 'El token a expirado'
                })
            }

            resolve(payload.sub)
        
        } catch (error) {
            reject({
                status: 500,
                mensaje: 'Tokene invalido'
            })
        }
    })
    return decoded;
}

module.exports = funcionesJwt;

