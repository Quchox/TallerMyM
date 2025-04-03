const express = require("express");
const devolucionController = require('../../controllers/finanzas/devolucionController');
const router = express.Router();

router.post("/registrar-devolucion/", devolucionController.insertDevolucion);
router.get("/obtener-devolucion/:id", devolucionController.getDevolucionById);

module.exports = router;
