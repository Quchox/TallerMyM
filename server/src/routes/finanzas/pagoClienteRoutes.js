const express = require("express");
const pagoClienteController = require('../../controllers/finanzas/pagoClienteController');
const router = express.Router();

router.post("/registrar-pago/", pagoClienteController.insertPagoCliente);
router.get("/obtener-pago/:id", pagoClienteController.getPagoClienteById);

module.exports = router;
