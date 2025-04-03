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
exports.getProveedorById = exports.getAllProveedor = void 0;
const proveedor_1 = require("../../models/inventario/proveedor");
const proveedorRepo = new proveedor_1.ProveedorRepository();
// Obtener todas los proverdores
const getAllProveedor = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedor = yield proveedorRepo.getAll(); // Get
        //validaciones
        res.json(proveedor);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los proveedores" });
    }
});
exports.getAllProveedor = getAllProveedor;
// Obtener un proveedor por ID
const getProveedorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const proveedor = yield proveedorRepo.findById(id); // Get
        // Validaciones - return
        if (!proveedor) {
            res.status(404).json({ error: "Proveedor no encontrado" }); // Return
        }
        res.json(proveedor); //Return exitoso
    }
    catch (error) {
        console.error("Error en getProveedorById:", error);
        res.status(500).json({ error: "Error al obtener la proveedor" });
    }
});
exports.getProveedorById = getProveedorById;
