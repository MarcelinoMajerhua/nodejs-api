const express =require("express");
const router = express.Router();
const {isAuth} = require('../middlewares/auth')
const {actualizarProducto,borrarProducto,mostrarProducto,mostrarUnProducto,enviarProducto} =require("../controllers/producto.controllers")
//controller 
router.get("/producto",isAuth,mostrarProducto);
router.post("/producto",enviarProducto);
router.get("/producto/:idProducto",mostrarUnProducto);
router.delete("/producto/:id",borrarProducto);
router.put("/producto/:id",actualizarProducto);

module.exports=router;