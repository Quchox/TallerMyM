const { connectDB } = require("../../config/database");
const sql = require('mssql');

class Cliente {
  constructor(nombre, apellido, cedula, correo, telefono, fechaRegistro) {
    this.idCliente = 0;
    this.nombre = nombre;
    this.apellido = apellido;
    this.cedula = cedula;
    this.correo = correo;
    this.telefono = telefono;
    this.fechaRegistro = fechaRegistro;
  }
}
//------------
class ClienteRepository {
  // Insertar nuevos clientes
  async insert(cliente) {
    console.log(cliente)
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("nombre", cliente.nombre)
        .input("apellido", cliente.apellido)
        .input("cedula", cliente.cedula)
        .input("correo", cliente.correo)
        .input("telefono", cliente.telefono)
        .input("fechaRegistro", cliente.fechaRegistro)
        .query(`
          INSERT INTO CLIENTE (nombre, apellido, cedula, correo, telefono, fechaRegistro)
          VALUES (@nombre, @apellido, @cedula, @correo, @telefono, @fechaRegistro)
        `);
      console.log("Cliente insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar cliente");
    }
  }


  // Actualizar cliente
  async updateCliente(cedula, datosActualizados) {
    try {
      const pool = await connectDB();
      const { id,cedula, nombre, apellido, correo, telefono } = datosActualizados;

      const result = await pool
        .request()
        .input("idCliente", sql.Int, id)
        .input("cedula", sql.VarChar, cedula)
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("correo", sql.VarChar, correo)
        .input("telefono", sql.VarChar, telefono)
        .query(`
          UPDATE CLIENTE
          SET cedula = @cedula, nombre = @nombre, apellido = @apellido, correo = @correo, telefono = @telefono
          WHERE cedula = @cedula
        `);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      throw new Error("Error al actualizar cliente");
    }
  }

  // Eliminar cliente
  async deleteCliente(cedula) {
    try {
      
      const pool = await connectDB();
      console.log("Conexión establecida con la base de datos.");

    
      const result = await pool
        .request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          DELETE FROM CLIENTE WHERE cedula = @cedula
        `);

      console.log("Resultado de la eliminación:", result);
      console.log("Filas afectadas:", result.rowsAffected[0]);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error444 al eliminar cliente:", error);
      throw new Error("Error444 al eliminar cliente");
    }
  }
  //----CED
//select todos
  async getAll() {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM CLIENTE");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      throw new Error("Error al obtener clientes");
    }
  }

  // Obtener cliente por cédula
  async getByCedula(cedula) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("cedula", sql.VarChar(10), cedula)
        .query("SELECT * FROM CLIENTE WHERE cedula = @cedula");

      return result.recordset;
      
    } catch (error) {
      console.error("Error al consultar cliente:", error);
      throw new Error("Error al consultar cliente");
    }
  }
}

module.exports = { Cliente, ClienteRepository };


  /* Obtener historial por cédula
  async getHistorialOrdenesByCedula(cedula) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("cedula", sql.VarChar, cedula)
        .query(`
          SELECT 
            o.idOrden,
            o.codigoOrden,
            o.estadoOrden,
            o.fechaIngreso,
            o.estadoAtrasado,
            o.tiempoEstimado,
            v.placaVehiculo,
            v.modeloVehiculo,
            v.marcaVehiculo,
            c.nombre AS nombreCliente,
            c.telefono AS telefonoCliente
          FROM ORDEN o
          JOIN CLIENTE_VEHICULO v ON o.idVehiculo = v.idVehiculo
          JOIN CLIENTE c ON o.idCliente = c.idCliente
          WHERE c.cedula = @cedula
          ORDER BY o.fechaIngreso DESC
        `);
      if (result.recordset.length === 0) {
        return null;
      }
      return result.recordset;
    } catch (error) {
      console.error("Error al consultar historial de órdenes:", error);
      throw new Error("Error al consultar historial de órdenes");
    }
  }
*/