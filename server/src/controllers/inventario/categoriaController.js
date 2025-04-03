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
exports.getCategoriaById = exports.getAllCategorias = void 0;
const categoria_1 = require("../../models/inventario/categoria");
const categoriaRepo = new categoria_1.CategoriaRepository();

// Obtener todas las categorías
const getAllCategorias = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoriaRepo.getAll(); // Get
        //validaciones
        res.json(categorias);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener las categorías" });
    }
});
exports.getAllCategorias = getAllCategorias;
// Obtener una categoría por ID
const getCategoriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const categoria = yield categoriaRepo.findById(id); // Get
        // Validaciones - return
        if (!categoria) {
            res.status(404).json({ error: "Categoría no encontrada" }); // Return
        }
        res.json(categoria); //Return exitoso
    }
    catch (error) {
        console.error("controller - Error en getCategoriaById:", error);
        res.status(500).json({ error: "controller - Error al obtener la categoría" });
    }
});
exports.getCategoriaById = getCategoriaById;
