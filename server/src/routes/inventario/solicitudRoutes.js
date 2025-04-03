"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const solicitudController_1 = require("../../controllers/inventario/solicitudController");
const router = express_1.default.Router();
router.get("/solicitud", solicitudController_1.getAllSolicitud);
router.post("/agregar-solicitud", solicitudController_1.addSolicitud);
router.put("/procesar-solicitud", solicitudController_1.updateSolicitud);
exports.default = router;
