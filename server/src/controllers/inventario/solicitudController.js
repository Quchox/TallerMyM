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
exports.deleteSolicitud = exports.updateSolicitud = exports.addSolicitud = exports.getAllSolicituds = void 0;
const solicitud_1 = require("../../models/inventario/solicitudProducto");
const SolicitudRepo = new solicitud_1.SolicitudRepository();

// Obtener todas las solicitudes
const getAllSolicitud = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solicitud = yield SolicitudRepo.getAllSolicitud(); // Get
        //validaciones
        res.json(solicitud);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener la solicitud" });
    }
});
exports.getAllSolicitud = getAllSolicitud;

// Registrar una nueva solicitud
const addSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { titulo, cuerpo, usuario } = req.body;
        // Llamar al método insertSolicitud para insertar el nuevo solicitud en la base de datos
        const nuevaSolicitud = yield SolicitudRepo.insertSolicitud(titulo, cuerpo, usuario);
        // Respuesta exitosa con el solicitud insertado
        res.status(201).json({
            message: "Solicitud insertado exitosamente",
            solicitud: nuevaSolicitud,
        });
        // Manejo de errores
    }
    catch (error) {
        console.error("Error al insertar la solicitud:", error);
        res.status(500).json({ error: "Error al insertar la solicitud" });
    }
});
exports.addSolicitud = addSolicitud;

// Actualizar una solicitud
const updateSolicitud = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { idSolicitud, aprobado } = req.body;
        // Llamar al método updateSolicitud para actualizar la solicitud
        const procesarSolicitud = yield SolicitudRepo.updateSolicitud(idSolicitud, aprobado);
        // Respuesta exitosa
        res.status(200).json({
            message: "Solicitud procesada exitosamente",
            Res: procesarSolicitud,
        });
    }
    catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});
exports.updateSolicitud = updateSolicitud;
