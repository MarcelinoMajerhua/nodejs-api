const productoCtrl={};

const Producto = require('../models/Producto');

productoCtrl.mostrarProducto=(req,res)=>{
    Producto.find({},(err,productos)=>{
        if(err) return res.status(500).send({mensaje:'Error al locacalizar el producto'});
        if(!productos) return res.status(404).send({mensaje:'no existen productos'});
        res.status(200).send(productos)
    })
}

productoCtrl.mostrarUnProducto=async (req,res)=>{
    let productoId = req.params.idProducto;

    Producto.findOne({_id:productoId},(err,producto)=>{
        if(err) return res.status(500).send({mensaje:'Error al locacalizar el producto'});
        if(!producto) return res.status(404).send({mensaje:'El producto no existe'});
        res.status(200).send({producto});
    });
}

productoCtrl.enviarProducto=async (req,res)=>{
    const {codigo_producto,nombre_producto,precio_producto}=req.body;
    const producto = new Producto({codigo_producto,nombre_producto,precio_producto});
    await producto.save((err,productStore)=>{
        if(err)res.status(500).send({mensaje:'Error al guardar datos '+err});
        res.status(200).send({producto:productStore})
    });
    
}

productoCtrl.borrarProducto= async (req,res)=>{
    let productoId = req.params.id;
    Producto.findById({_id:productoId},(err,producto)=>{
        if(err)res.status(500).send({mensaje:'Producto no encontrado'});
        producto.remove(err=>{
            if(err)res.status(500).send({mensaje:'No se ha podido borrar'});
            res.status(200).send({mensaje:'El producto ha sido eliminado'});
        });
    })
}

productoCtrl.actualizarProducto = async(req,res)=>{
    let productoId = req.params.id;
    let updateBody=req.body;
    Producto.findByIdAndUpdate({_id:productoId},updateBody,(err,updateProducto)=>{
        if(err)res.status(500).send({mensaje:'Error al actualizar el porducto'});
        res.status(200).send({productoActualizado:updateProducto})
    })
}

module.exports = productoCtrl;