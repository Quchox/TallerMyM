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
exports.CategoriaRepository = exports.Categoria = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");
class Categoria {
    constructor(idCategoria, nombreCategoria) {
        this.idCategoria = idCategoria;
        this.nombreCategoria = nombreCategoria;
    }
}
exports.Categoria = Categoria;
class CategoriaRepository {
    // Obtener todas las categorias
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool.request().query("SELECT * FROM categoria");
                return result.recordset;
            }
            catch (error) {
                console.error("Error en getAll:", error);
                throw new Error("Error al obtener categorías");
            }
        });
    }
    findById(idCategoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    .request()
                    .input("idCategoria", mssql_1.default.Int, idCategoria) // Parametros
                    .query("SELECT * FROM categoria WHERE idCategoria = @idCategoria");
                return result.recordset.length > 0 ? result.recordset[0] : null;
            }
            catch (error) {
                console.error(" Error en findById:", error);
                throw new Error("Error al obtener categoría por ID");
            }
        });
    }
}
exports.CategoriaRepository = CategoriaRepository;
