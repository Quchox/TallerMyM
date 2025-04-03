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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarcaById = exports.getAllMarcas = void 0;
const marca_1 = require("../../models/inventario/marca");
const categoriaRepo = new marca_1.MarcaRepository();
// Obtener todas las marcas
const getAllMarcas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marca = yield categoriaRepo.getAll(); // Get
        //validaciones
        res.json(marca);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener las marcas" });
    }
});
exports.getAllMarcas = getAllMarcas;
// Obtener una marca por ID
const getMarcaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const marca = yield categoriaRepo.findById(id); // Get
        // Validaciones - return
        if (!marca) {
            res.status(404).json({ error: "marca no encontrada" }); // Return
        }
        res.json(marca); //Return exitoso
    }
    catch (error) {
        console.error("Error en getMarcaById:", error);
        res.status(500).json({ error: "Error al obtener la marca" });
    }
});
exports.getMarcaById = getMarcaById;
