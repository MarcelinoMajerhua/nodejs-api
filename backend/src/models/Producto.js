const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductoSchema =new Schema({
    codigo_producto:{type:String},
    nombre_producto:{type:String},
    precio_producto:{type:Number,default:0}
});

module.exports = mongoose.model('Producto',ProductoSchema);

