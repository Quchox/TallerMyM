"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productoController_1 = require("../../controllers/inventario/productoController");
const router = express_1.default.Router();
router.post("/", productoController_1.getAllProductos);
router.get("/precios", productoController_1.getMinMax);
router.get("/:id", productoController_1.getProductoById);
router.post("/agregar-producto/", productoController_1.addProducto);
router.put("/actualizar-producto/", productoController_1.updateProducto);
router.delete("/eliminar-producto/:id", productoController_1.deleteProducto);
exports.default = router;
