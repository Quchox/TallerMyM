"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehiculosCompatiblesController_1 = require("../../controllers/inventario/vehiculosCompatiblesController");
const router = express_1.default.Router();
router.get("/", vehiculosCompatiblesController_1.getAllVehiculos);
router.get("/:id", vehiculosCompatiblesController_1.getVehiculoById);
exports.default = router;
