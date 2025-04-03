//const { default: id } = require("date-fns/esm/locale/id/index.js");
const { connectDB } = require("../../config/database");
const sql = require('mssql');

class Vehiculo {
  constructor(placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente) {

    this.idVehiculo = 0;
    this.placaVehiculo = placaVehiculo;
    this.modeloVehiculo = modeloVehiculo;
    this.marcaVehiculo = marcaVehiculo;
    this.annoVehiculo = annoVehiculo;
    this.tipoVehiculo = tipoVehiculo;
    this.idCliente = idCliente;
  }
}
//------------
class VehiculoRepository {
  // Insertar nuevos clientes
  async insert(Vehiculo) {
    console.log(Vehiculo)
    try {
      const pool = await connectDB();
      await pool
        .request()
        .input("placaVehiculo", Vehiculo.placaVehiculo)
        .input("modeloVehiculo", Vehiculo.modeloVehiculo)
        .input("marcaVehiculo", Vehiculo.marcaVehiculo)
        .input("annoVehiculo", Vehiculo.annoVehiculo)
        .input("tipoVehiculo", Vehiculo.tipoVehiculo)
        .input("idCliente", Vehiculo.idCliente)
        .query(`
          INSERT INTO CLIENTE_VEHICULO (placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente)
          VALUES (@placaVehiculo, @modeloVehiculo, @marcaVehiculo, @annoVehiculo, @tipoVehiculo, @idCliente)
        `);
      console.log("Vehiculo insertado exitosamente");
    } catch (error) {
      console.error("Error en insert:", error);
      throw new Error("Error al insertar cliente");
    }
  }
  //--------------------------------

  // Actualizar cliente
  async updateVehiculo(idVehiculo, datosActualizados) {
    try {
      const pool = await connectDB();
      
      const { idVehiculo,placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo, tipoVehiculo, idCliente } = datosActualizados;

      const result = await pool
        .request()
        .input("idVehiculo", sql.Int, idVehiculo)
        .input("placaVehiculo", sql.VarChar, placaVehiculo)
        .input("modeloVehiculo", sql.VarChar, modeloVehiculo)
        .input("marcaVehiculo", sql.VarChar, marcaVehiculo)
        .input("annoVehiculo", sql.Int, annoVehiculo)
        .input("tipoVehiculo", sql.VarChar, tipoVehiculo)
        .input("idCliente", sql.Int, idCliente)
        .query(`
          UPDATE CLIENTE_VEHICULO
          SET placaVehiculo = @placaVehiculo, modeloVehiculo = @modeloVehiculo, marcaVehiculo = @marcaVehiculo,
           annoVehiculo = @annoVehiculo, tipoVehiculo = @tipoVehiculo, idCliente = @idCliente WHERE idVehiculo = @idVehiculo
        `);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar el vehiculo:", error);
      throw new Error("Error al actualizar el vehiculo");
    }
  }

  // Eliminar cliente
  async deleteVehiculo(idVehiculo) {
    try {

      const pool = await connectDB();
      console.log("Conexión establecida con la base de datos.");


      const result = await pool
        .request()
        .input("idVehiculo", sql.Int, idVehiculo)
        .query(`
          DELETE FROM CLIENTE_VEHICULO WHERE idVehiculo = @idVehiculo
        `);

      console.log("Resultado de la eliminación:", result);
      console.log("Filas afectadas:", result.rowsAffected[0]);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al eliminar vehiculo:", error);
      throw new Error("Error al eliminar vehiculo");
    }
  }
  //----CED
  //select todos
  async getAll() {
    try {
      const pool = await connectDB();
      const result = await pool.request().query("SELECT * FROM CLIENTE_VEHICULO");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      throw new Error("Error al obtener clientes");
    }
  }

  // Buscar por ID cliente // Select-Flujo
  async getVehiculosPorCliente(idCliente) {
    try {
      const pool = await connectDB();
      const result = await pool.request()
        .input("idCliente", sql.Int, idCliente).query(`SELECT idVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo FROM CLIENTE_VEHICULO
          WHERE idCliente = @idCliente`);
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener los vehiculos:", error);
      throw new Error("Error al obtener vehiculos");
    }
  }

    // Buscar por ID cliente // Select-Flujo
    async getVehiculosPorIdVehiculo(idVehiculo) {
      try {
        const pool = await connectDB();
        const result = await pool.request()
          .input("idVehiculo", sql.Int, idVehiculo).query(`SELECT idVehiculo,placaVehiculo, modeloVehiculo, marcaVehiculo, annoVehiculo,tipoVehiculo,"idCliente"
             FROM CLIENTE_VEHICULO WHERE idVehiculo = @idVehiculo`);
        return result.recordset;
      } catch (error) {
        console.error("Error al obtener los vehiculos:", error);
        throw new Error("Error al obtener vehiculos");
      }
    }

  // Obtener cliente por cédula
  async getByPlaca(placaVehiculo) {
    try {
      const pool = await connectDB();
      const result = await pool.request().input("placaVehiculo", sql.VarChar(10), placaVehiculo)
        .query("SELECT * FROM CLIENTE_VEHICULO WHERE placaVehiculo = @placaVehiculo");

      return result.recordset;

    } catch (error) {
      console.error("Error al consultar el vehiculo:", error);
      throw new Error("Error al consultar el vehiculo");
    }
  }

}

module.exports = { Vehiculo, VehiculoRepository };
