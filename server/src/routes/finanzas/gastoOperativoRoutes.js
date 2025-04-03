const express = require("express");
const gastoOperativoController = require('../../controllers/finanzas/gastoOperativoController');
const router = express.Router();

router.post("/agregar-gasto-operativo/", gastoOperativoController.insertGastoOperativo);
router.get("/obtener-gastos-operativos/", gastoOperativoController.getGastoOperativos);

module.exports = router;
