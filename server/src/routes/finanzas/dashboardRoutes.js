const express = require("express");
const dashboardController = require('../../controllers/finanzas/dashboardController');
const router = express.Router();

router.get("/obtener-ganancia-mes/", dashboardController.getGanaciaMes);
router.get("/obtener-gasto-mes/", dashboardController.getGastoMes);

module.exports = router;
