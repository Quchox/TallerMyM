const express = require("express");
const ventasController = require('../../controllers/ventas/ventasController');
const router = express.Router();

router.post("/registrar-venta/", ventasController.insertVenta);
router.post("/obtener-ventas", ventasController.getVentas);
router.get("/obtener-venta/:id", ventasController.getVentaById);
router.post("/agregar-producto/", ventasController.agregarProducto);
router.get("/obtener-productos-venta/:id", ventasController.getProductosVenta);
router.post("/eliminar-producto-venta/", ventasController.deleteProductoVenta);


// Exporta el router usando CommonJS
module.exports = router;
