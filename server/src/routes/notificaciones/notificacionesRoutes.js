const express = require("express");
const notificacionesController = require('../../controllers/notificaciones/notificacionesController');
const router = express.Router();

router.post("/obtener-notificaciones/", notificacionesController.getNotificaciones);
router.delete("/eliminar-notificacion/:id", notificacionesController.EliminarNotificacion);


module.exports = router