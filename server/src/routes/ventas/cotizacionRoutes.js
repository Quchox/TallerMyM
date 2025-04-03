const express = require("express");
const cotizacionController = require('../../controllers/ventas/cotizacionController');
const router = express.Router();

// Ruta para agregar cotización
router.post("/agregar-cotizacion/", cotizacionController.insertCotizacion);
router.get("/obtener-cotizaciones",cotizacionController.getCotizacion);
router.get("/obtener-cotizacion/:id",cotizacionController.getCotizacionById);
router.put("/actualizar-cotizacion/",cotizacionController.updateCotizacion);
router.delete("/eliminar-cotizacion/:id",cotizacionController.deleteCotizacion);

// Exporta el router usando CommonJS
module.exports = router;
