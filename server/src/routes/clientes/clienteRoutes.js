import express from "express";
import clienteController from "../../controllers/clientes/clienteController.js";

const router = express.Router();

// Ruta para registrar un cliente
router.post("/registrar", clienteController.insertCliente);
// Ruta para actualizar los datos de un cliente
router.put('/editar/:cedula', clienteController.actualizarCliente);
// Ruta para eliminar un cliente por cédula
router.delete('/eliminar/:cedula', clienteController.eliminarCliente);

//Obtener
router.get("/obtenerclientes", clienteController.obtenerTodosLosClientes);

router.get("/:cedula", clienteController.obtenerClientePorCedula);





export default router;
