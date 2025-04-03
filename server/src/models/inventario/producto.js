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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = exports.ProductoServicio = void 0;
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../../config/database");


class ProductoServicio {
    constructor(idProducto, nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, proveedor, categoria, vehiculosCompatibles, tipo, img, porcentajeDescuento, stockMinimo) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.marca = marca;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.fechaIngreso = fechaIngreso;
        this.ubicacionAlmacen = ubicacionAlmacen;
        this.proveedor = proveedor;
        this.categoria = categoria;
        this.vehiculosCompatibles = vehiculosCompatibles;
        this.tipo = tipo;
        this.img = img;
        this.porcentajeDescuento = porcentajeDescuento;
        this.stockMinimo = stockMinimo;
    }
}

exports.ProductoServicio = ProductoServicio;

class ProductoRepository {
    // Obtener todos los productos
    getAll(nombre, marca, categoria, stock, rangoPrecio) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const precioMin = (rangoPrecio && rangoPrecio[0]) || null;
                const precioMax = (rangoPrecio && rangoPrecio[1]) || null;
                const pool = yield (0, database_1.connectDB)();
                // llamada al procedimiento almacenado
                const result = yield pool
                    .request()
                    .input('nombre', mssql_1.default.VarChar(50), nombre || null)
                    .input('marca', mssql_1.default.VarChar(50), marca || null)
                    .input('categoria', mssql_1.default.VarChar(50), categoria || null)
                    .input('stock', mssql_1.default.Int, stock || null)
                    .input('precioMin', mssql_1.default.Decimal(18, 2), precioMin)
                    .input('precioMax', mssql_1.default.Decimal(18, 2), precioMax)
                    .execute('SP_FILTRO_PRODUCTOS');  // Ejecutar el procedimiento
                // Retorno de los resultados
                return result.recordset;
            }
            catch (error) {
                console.error("M-Error en getAll:", error);
                throw new Error("M-Error al obtener productos");
            }
        });
    }

    findById(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    .request()
                    .input("idProducto", mssql_1.default.Int, idProducto) // Parametros
                    .query(`SELECT
                        idproducto,
                        nombre,
                        marca,
                        descripcion,
                        precio,
                        stock,
                        fechaIngreso,
                        ubicacionAlmacen,
                        proveedor,
                        categoria,
                        vehiculosCompatibles,
                        tipo,
                        img,
                        porcentajeDescuento*100 as porcentajeDescuento,
                        stockMinimo
                        FROM PRODUCTO_SERVICIO WHERE idProducto = @idProducto`);
                return result.recordset.length > 0 ? result.recordset[0] : null;
            }
            catch (error) {
                console.error(" Error en findById:", error);
                throw new Error("Error al obtener producto por ID");
            }
        });
    }
    // Insertar producto
    insertProducto(nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, proveedor, categoria, vehiculosCompatibles, tipo, img, stockMinimo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool
                    //PARAMETROS
                    .request()
                    .input("nombre", mssql_1.default.VarChar, nombre)
                    .input("marca", mssql_1.default.VarChar, marca)
                    .input("descripcion", mssql_1.default.NVarChar, descripcion)
                    .input("precio", mssql_1.default.Decimal(10, 2), precio)
                    .input("stock", mssql_1.default.Int, stock)
                    .input("fechaIngreso", mssql_1.default.Date, fechaIngreso)
                    .input("ubicacionAlmacen", mssql_1.default.VarChar, ubicacionAlmacen)
                    .input("proveedor", mssql_1.default.VarChar, proveedor)
                    .input("categoria", mssql_1.default.VarChar, categoria)
                    .input("vehiculosCompatibles", mssql_1.default.NVarChar, vehiculosCompatibles)
                    .input("tipo", mssql_1.default.VarChar, tipo)
                    .input("img", mssql_1.default.VarChar, img || null)
                    .input("stockMinimo", mssql_1.default.Int, stockMinimo || 1)
                    .query(`
                    INSERT INTO PRODUCTO_SERVICIO 
                    (nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, 
                    proveedor, categoria, vehiculosCompatibles, tipo, img, porcentajeDescuento,stockMinimo) 
                    VALUES 
                    (@nombre, @marca, @descripcion, @precio, @stock, @fechaIngreso, @ubicacionAlmacen, 
                    @proveedor, @categoria, @vehiculosCompatibles, @tipo, @img, 0,@stockMinimo)`);
                return result.rowsAffected[0];
            }
            catch (error) {
                console.error("Error en insertar producto o servicio:", error);
                throw new Error("Error al insertar producto o servicio");
            }
        });
    }
    // Actualizar producto
    updateProducto(idProducto, nombre, marca, descripcion, precio, stock, fechaIngreso, ubicacionAlmacen, proveedor, categoria, vehiculosCompatibles, tipo, img, porcentajeDescuento, stockMinimo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool.request()
                    .input("idProducto", mssql_1.default.Int, idProducto)
                    .input("nombre", mssql_1.default.VarChar, nombre)
                    .input("marca", mssql_1.default.VarChar, marca)
                    .input("descripcion", mssql_1.default.NVarChar, descripcion)
                    .input("precio", mssql_1.default.Decimal(10, 2), precio)
                    .input("stock", mssql_1.default.Int, stock)
                    .input("fechaIngreso", mssql_1.default.Date, fechaIngreso)
                    .input("ubicacionAlmacen", mssql_1.default.VarChar, ubicacionAlmacen)
                    .input("proveedor", mssql_1.default.VarChar, proveedor)
                    .input("categoria", mssql_1.default.VarChar, categoria)
                    .input("vehiculosCompatibles", mssql_1.default.NVarChar, vehiculosCompatibles)
                    .input("tipo", mssql_1.default.VarChar, tipo)
                    .input("img", mssql_1.default.NVarChar, img || null)
                    .input("porcentajeDescuento", mssql_1.default.Decimal(10, 2), porcentajeDescuento || 0)
                    .input("stockMinimo", mssql_1.default.Int, stockMinimo || 1)
                    .query(`
                    UPDATE PRODUCTO_SERVICIO SET
                        nombre = @nombre,
                        marca = @marca,
                        descripcion = @descripcion,
                        precio = @precio,
                        stock = @stock,
                        fechaIngreso = @fechaIngreso,
                        ubicacionAlmacen = @ubicacionAlmacen,
                        proveedor = @proveedor,
                        categoria = @categoria,
                        vehiculosCompatibles = @vehiculosCompatibles,
                        tipo = @tipo,
                        img = @img,
                        porcentajeDescuento = @porcentajeDescuento,
                        stockMinimo = @stockMinimo
                    WHERE idProducto = @idProducto
                    `);
                console.log("Filas afectadas:", result.rowsAffected[0]);
                return result.rowsAffected[0];
            }
            catch (error) {
                console.error("Server - Error en actualizar producto o servicio:", error);
            }
        });
    }
    // Eliminar un producto
    deleteProducto(idProducto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                yield pool.request().input("idProducto", mssql_1.default.Int, idProducto).query(`
          DELETE FROM PRODUCTO_SERVICIO WHERE idProducto = @idProducto
        `);
            }
            catch (error) {
                console.error("Error en delete:", error);
                throw new Error("Error al eliminar el producto");
            }
        });
    }

    getMinMax() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield (0, database_1.connectDB)();
                const result = yield pool.request().query(`
                    SELECT MIN(precio) AS precioMin, MAX(precio) AS precioMax
                    FROM PRODUCTO_SERVICIO`);
                return result.recordset;
            } catch (error) {
                console.error("Error en obtener:", error);
                throw new Error(error);
            }
        });
    }
}
exports.ProductoRepository = ProductoRepository;
