require('dotenv').config();

const app = require('./server');
require('./database');

//escuchando al server 

app.listen(app.get('port'),()=>{
    console.log('Servidor en puerto',app.get('port'));
    console.log('Environment:',process.env.NODE_ENV);
});