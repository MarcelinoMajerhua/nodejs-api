const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors')

//inicializando 
const app = express();
//poner las configuracion de passport 
app.use(cors())
//configurando 

app.set('port',process.env.PORT || 3001);

//middlerwares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'backEND',
    resave:true,
    saveUninitialized:true
}));


//routes 

app.use(require('./routes/producto.routes'));

app.use(require('./routes/user.routes'));

module.exports = app;