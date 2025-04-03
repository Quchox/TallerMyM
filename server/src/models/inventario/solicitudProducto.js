"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudRepository = exports.SolicitudProducto = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");
class SolicitudProducto {
    constructor(idSolicitud, titulo, cuerpo, usuario, fecha) {
        this.idSolicitud = idSolicitud;
        this.titulo = titulo;
        this.cuerpo = cuerpo;
        this.usuario = usuario;
        this.fecha = fecha;
    }
}

exports.SolicitudProducto = SolicitudProducto;
class SolicitudRepository {

    // Obtener todas las solicitudes
    getAllSolicitud() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)(); //conexion BD
                const result = yield pool
                    .request()
                    .query("SELECT * FROM INV_REPUESTO_SOLICITUD WHERE aprobado IS NULL"); //QUERY
                return result.recordset;
            }
            catch (error) {
                //Manejo de errores
                console.error("Error en getAll:", error);
                throw new Error("Error al obtener solicitud", error);
            }
        });
    }

    // Insertar solicitud
    insertSolicitud(titulo, cuerpo, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    //PARAMETROS
                    .request()
                    .input("titulo", mssql_1.default.VarChar, titulo)
                    .input("cuerpo", mssql_1.default.NVarChar, cuerpo)
                    .input("usuario", mssql_1.default.VarChar, usuario).query(`
          INSERT INTO INV_REPUESTO_SOLICITUD 
          (titulo, cuerpo, usuario)
          VALUES 
          (@titulo, @cuerpo, @usuario)
        `);
                return result.rowsAffected[0];
            }
            catch (error) {
                console.error("Error en insertar solicitud:", error);
            }
        });
    }

    // Actualizar solicitud
    updateSolicitud(idSolicitud, aprobado) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    //PARAMETROS
                    .request()
                    .input("idSolicitud", mssql_1.default.Int, idSolicitud)
                    .input("aprobado", mssql_1.default.Bit, aprobado).query(`
                    UPDATE INV_REPUESTO_SOLICITUD 
                    SET aprobado = @aprobado
                    WHERE idSolicitud = @idSolicitud
                    `);
                return result.rowsAffected[0];
            }
            catch (error) {
                console.error("Error en actualizar solicitud:", error);
            }
        });
    }
}
exports.SolicitudRepository = SolicitudRepository;
