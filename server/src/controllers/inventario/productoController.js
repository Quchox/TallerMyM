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
exports.deleteProducto = exports.updateProducto = exports.addProducto = exports.getProductoById = exports.getAllProductos = void 0;
const producto_1 = require("../../models/inventario/producto");
const ProductoRepo = new producto_1.ProductoRepository();

// Obtener todas las producto - filtros y paginacion
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body);
        const { nombre, marca, categoria, stock, rangoPrecio } = req.body;

        const producto = yield ProductoRepo.getAll(nombre, marca, categoria, stock, rangoPrecio); // Get
        //validaciones
        res.json(producto);
    }
    catch (error) {
        res.status(500).json({ error: "C-Error al obtener los producto" });
    }
});
exports.getAllProductos = getAllProductos;

// Obtener una producto por ID
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        // Verificar si el ID es válido
        if (isNaN(id)) {
            return res.status(400).json({ error: "El parámetro id debe ser un número válido" });
        }
        const producto = yield ProductoRepo.findById(id);
        // Si no se encuentra el producto, se detiene la ejecución con return
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        // Si se encuentra el producto, se responde con JSON
        return res.json(producto);
    }
    catch (error) {
        console.error("Error en obtener producto por id:", error);
        return res.status(500).json({ error: "Error al obtener el producto" });
    }
});
exports.getProductoById = getProductoById;

// Registrar nuevo producto
const addProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const { nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, proveedor, categoria, vehiculosCompatibles, tipo, img, stockMinimo } = req.body;
        // Llamar al método insertProducto para insertar el nuevo producto en la base de datos
        const nuevoProducto = yield ProductoRepo.insertProducto(nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, proveedor, categoria, vehiculosCompatibles, tipo, img, stockMinimo);
        // Respuesta exitosa con el producto insertado
        res.status(201).json({
            message: "Producto insertado exitosamente",
            producto: nuevoProducto,
        });
        // Manejo de errores
    }
    catch (error) {
        console.error("Error al insertar producto:", error);
        res.status(500).json({ error: "Error al insertar el producto" });
    }
});
exports.addProducto = addProducto;

// Actualizar un producto
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener los datos del cuerpo de la solicitud
        const idProducto = req.body.idproducto;
        const nombre = req.body.nombre;
        const marca = req.body.marca;
        const descripcion = req.body.descripcion;
        const precio = req.body.precio;
        const stock = req.body.stock;
        const fechaIngreso = req.body.fechaIngreso;
        const ubicacionAlmacen = req.body.ubicacionAlmacen;
        const proveedor = req.body.proveedor;
        const categoria = req.body.categoria;
        const vehiculosCompatibles = req.body.vehiculosCompatibles;
        const tipo = req.body.tipo;
        const img = req.body.img;
        const stockMinimo = req.body.stockMinimo;

        //parse a porcentaje INT a decimales FLOAT
        const porcentajeDescuento = parseFloat(req.body.porcentajeDescuento) / 100 || 0;

        // Llamar al metodo update Producto
        const actualizarProducto = yield ProductoRepo.updateProducto(idProducto, nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, proveedor, categoria, vehiculosCompatibles, tipo, img, porcentajeDescuento, stockMinimo);
        // Respuesta exitosa con el producto insertado
        res.status(201).json({
            message: "Producto actualizado exitosamente",
            producto: actualizarProducto,
        });
        // Manejo de errores
    }
    catch (error) {
        console.error("Controller - Error al actualizar producto:", error);
        res.status(500).json({ error: "Controller - Error al actualizar el producto" });
    }
});
exports.updateProducto = updateProducto;

// Eliminar producto
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id); // Parametro
        // Verificamos si el producto existe o id valido
        const producto = yield ProductoRepo.findById(id);
        if (!producto) {
            res.status(404).json({ error: "Controller - Producto no encontrado" }); // Si no existe o no se encontro con id
        }
        // Llama el metodo de borrado
        yield ProductoRepo.deleteProducto(id);
        // Respuesta exitosa
        res.status(200).json({ message: "Controller - Producto eliminado exitosamente" });
    }
    catch (error) {
        //Manejo de errores
        console.error("Controller - Error al eliminar producto:", error);
        res.status(500).json({ error: "Controller - Error al eliminar el producto" });
    }
});
exports.deleteProducto = deleteProducto;

const getMinMax = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const producto = yield ProductoRepo.getMinMax();
        if (!producto) {
            return res.status(404).json({ error: "No se encontraron datos de precios" });
        }
        res.json(producto[0]);
    } catch (error) {
        console.error("Error en getMinMax:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
exports.getMinMax = getMinMax;

