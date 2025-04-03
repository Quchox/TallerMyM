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
exports.VehiculoRepository = exports.VehiculosCompatibles = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");
class VehiculosCompatibles {
    constructor(idVehiculos, modelo) {
        this.idVehiculos = idVehiculos;
        this.modelo = modelo;
    }
}
exports.VehiculosCompatibles = VehiculosCompatibles;
class VehiculoRepository {
    // Obtener todas los vehiculos
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool.request().query("SELECT * FROM VEHICULOS_COMPATIBLES");
                return result.recordset;
            }
            catch (error) {
                console.error("Error en getAll:", error);
                throw new Error("Error al obtener vehiculos");
            }
        });
    }
    findById(idVehiculos) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    .request()
                    .input("idVehiculos", mssql_1.default.Int, idVehiculos) // Parametros
                    .query("SELECT * FROM VEHICULOS_COMPATIBLES WHERE idVehiculos = @idVehiculos");
                return result.recordset.length > 0 ? result.recordset[0] : null;
            }
            catch (error) {
                console.error(" Error en findById:", error);
                throw new Error("Error al obtener categoría por ID");
            }
        });
    }
}
exports.VehiculoRepository = VehiculoRepository;
