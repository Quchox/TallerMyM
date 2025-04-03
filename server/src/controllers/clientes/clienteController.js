const { Cliente, ClienteRepository } = require("../../models/clientes/cliente.js");

const clienteRepo = new ClienteRepository();

// Insertar un cliente
const insertCliente = async (req, res) => {
  try {
    const { nombre, apellido, cedula, correo, telefono, fechaRegistro } = req.body;
    const newCliente = new Cliente(nombre, apellido, cedula, correo, telefono, fechaRegistro);

    await clienteRepo.insert(newCliente);
    res.status(201).json(newCliente);
  } catch (error) {
    console.error("Error al insertar cliente:", error);
    res.status(500).json({ error: "Error al insertar el cliente" });
  }
};
// Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    
    const cedula = parseInt(req.params.cedula);
    const datosActualizados = req.body;
    const actualizacionExitosa = await clienteRepo.updateCliente(cedula, datosActualizados);

    if (!actualizacionExitosa) {
      res.status(404).json({ error: "Cliente no encontrado o no se pudo actualizar" });
    } else {
      res.status(200).json({ message: "Datos del cliente actualizados exitosamente" });
    }
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ error: "Error al actualizar los datos del cliente" });
  }
};
// Eliminar cliente
const eliminarCliente = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const clienteEliminado = await clienteRepo.deleteCliente(cedula);

    if (!clienteEliminado) {
      res.status(404).json({ error: "Cliente no encontrado oooo no se pudo eliminar" });
    } else {
      res.status(200).json({ message: "Cliente eliminado exitosamente" });
    }
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
};

// Obtener todos los clientes
const obtenerTodosLosClientes = async (req, res) => {
  try {
    // Usar el método getAll del repositorio
    const clientes = await clienteRepo.getAll();

    res.status(200).json(clientes);
  } catch (error) {
    console.error("Error al obtener todos los clientes:", error);
    res.status(500).json({ error: "Error al obtener todos los clientes" });
  }
};

// Obtener un cliente por cédula
const obtenerClientePorCedula = async (req, res) => {
  try {
    const { cedula } = req.params; // Obtener la cédula del query string /params 268570349 y /query cliente?cedula=268570349

    if (!cedula) {
      return res.status(400).json({ error: "La cédula es requerida" });
    }

    const cliente = await clienteRepo.getByCedula(cedula);

    if (!cliente || cliente.length === 0) {
      res.status(404).json({ error: "Cliente no encontrado" });
    } else {
      res.status(200).json(cliente[0]); // Devuelve el primer cliente encontrado
    }
  } catch (error) {
    console.error("Error al obtener cliente por cédula:", error);
    res.status(500).json({ error: "Error al obtener cliente por cédula" });
  }
};
//-----IGNORARF Obtener Historial de Órdenes de Cliente
const getHistorialOrdenesByCedula = async (req, res) => {
  try {
    const cedula = req.params.cedula;
    const historialOrdenes = await clienteRepo.getHistorialOrdenesByCedula(cedula);

    if (!historialOrdenes || historialOrdenes.length === 0) {
      res.status(404).json({ error: "No se encontraron (backendControll) órdenes para este cliente" });
      return;
    }
    res.json(historialOrdenes);
  } catch (error) {
    console.error("Error en getHistorialOrdenesByCedula:", error);
    res.status(500).json({ error: "Error al obtener el historial de órdenes" });
  }
};
module.exports = { 
  insertCliente,
  obtenerTodosLosClientes, 
  obtenerClientePorCedula, 
  getHistorialOrdenesByCedula, 
  actualizarCliente, 
  eliminarCliente 
};










