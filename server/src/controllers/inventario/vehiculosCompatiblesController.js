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
exports.getVehiculoById = exports.getAllVehiculos = void 0;
const vehiculosCompatibles_1 = require("../../models/inventario/vehiculosCompatibles");
const vehiculosRepo = new vehiculosCompatibles_1.VehiculoRepository();
// Obtener todas las Vehiculos
const getAllVehiculos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehiculo = yield vehiculosRepo.getAll(); // Get
        //validaciones
        res.json(vehiculo);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener las vehiculos" });
    }
});
exports.getAllVehiculos = getAllVehiculos;
// Obtener una vehiculo por ID
const getVehiculoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const vehiculo = yield vehiculosRepo.findById(id); // Get
        // Validaciones - return
        if (!vehiculo) {
            res.status(404).json({ error: "Vehiculo no encontrada" }); // Return
        }
        res.json(vehiculo); //Return exitoso
    }
    catch (error) {
        console.error("Error en getVehiculoById:", error);
        res.status(500).json({ error: "Error al obtener la vehiculo" });
    }
});
exports.getVehiculoById = getVehiculoById;
