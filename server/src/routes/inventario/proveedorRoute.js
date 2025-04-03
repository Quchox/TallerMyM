"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const proveedorController_1 = require("../../controllers/inventario/proveedorController");
const router = express_1.default.Router();
router.get("/", proveedorController_1.getAllProveedor); // GET /api/categorias
router.get("/:id", proveedorController_1.getProveedorById); // GET /api/categorias/:id
exports.default = router;
