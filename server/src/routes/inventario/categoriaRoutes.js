"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoriaController_1 = require("../../controllers/inventario/categoriaController");
const router = express_1.default.Router();
router.get("/", categoriaController_1.getAllCategorias); // GET /categorias
router.get("/:id", categoriaController_1.getCategoriaById); // GET /categorias/:id
exports.default = router;
