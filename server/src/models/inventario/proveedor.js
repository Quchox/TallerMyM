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
exports.ProveedorRepository = exports.proveedor = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");
class proveedor {
    constructor(idProveedor, nombreProveedor) {
        this.idProveedor = idProveedor;
        this.nombreProveedor = nombreProveedor;
    }
}
exports.proveedor = proveedor;
class ProveedorRepository {
    // Obtener todas las categorias
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool.request().query("SELECT * FROM PROVEEDOR");
                return result.recordset;
            }
            catch (error) {
                console.error("Error en getAll:", error);
                throw new Error("Error al obtener categorías");
            }
        });
    }
    findById(idProveedor) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    .request()
                    .input("idProveedor", mssql_1.default.Int, idProveedor) // Parametros
                    .query("SELECT * FROM PROVEEDOR WHERE idProveedor = @idProveedor");
                return result.recordset.length > 0 ? result.recordset[0] : null;
            }
            catch (error) {
                console.error(" Error en findById:", error);
                throw new Error("Error al obtener categoría por ID");
            }
        });
    }
}
exports.ProveedorRepository = ProveedorRepository;
