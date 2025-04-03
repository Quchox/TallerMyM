import sql from 'mssql';
import { connectDB } from '../../config/database.js';

export class Venta {
    constructor(idVenta, fechaVenta, montoTotal, detalles, idOrden) {
        this.idVenta = idVenta;
        this.fechaVenta = fechaVenta;
        this.montoTotal = montoTotal;
        this.detalles = detalles;
        this.idOrden = idOrden;
    }
}

export class VentaRepository {

    // Método para insertar venta
    async insertVenta(idOrden, detalles) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idOrden', sql.Int, idOrden)
                .input('detalles', sql.NVarChar, detalles)
                .execute(`SP_INSERT_VENTA`);
            return result.rowsAffected[0]; // Devuelve el número de filas afectadas
        } catch (error) {
            console.error('Error en insertar venta:', error);
            throw new Error('Error en insertar venta');
        }
    }

    //obtener listado
    async getVentas(nombreCliente, codigoOrden) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('codigoOrden', sql.VarChar, codigoOrden || null)
                .input('nombreCliente', sql.VarChar, nombreCliente || null)
                .execute(`SP_GET_VENTAS`);
            return result.recordset; // Devuelve el listado 
        } catch (error) {
            console.error('Error en obtener venta:', error);
            throw new Error('Error en obtener venta');
        }
    }

    //obtener Venta por ID
    async getVentaById(idVenta) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idVenta', sql.Int, idVenta)
                .execute(`SP_GET_VENTA`);
            return result.recordset[0]; // Devuelve el registro
        } catch (error) {
            console.error('Error en obtener venta:', error);
            throw new Error('Error en obtener venta');
        }
    }

    //Agregar producto a venta
    async agregarProducto(idVenta, idProducto, cantidad) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idVenta', sql.Int, idVenta)
                .input('idProducto', sql.Int, idProducto)
                .input('cantidad', sql.Int, cantidad)
                .execute('SP_INSERTAR_PRODUCTO_VENTA');
            return result.rowsAffected;

        } catch (error) {
            console.error('M-Error en insertar producto', error);
            throw new Error('M-Error en insertar producto');
        }
    }

    //Obtener productos de venta
    async getProductosVenta(idVenta) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idVenta', sql.Int, idVenta)
                .execute('SP_GET_PRODUCTOS_VENTA');
            return result.recordset;

        } catch (error) {
            console.error('M-Error en obtener productos', error);
            throw new Error('M-Error en obtener productos');
        }
    }

    //Eliminar
    async deleteProductoVenta(idProductoVenta, idProducto, cantidad) {
        try {
            const pool = await connectDB();
            const result = await pool
                .request()
                .input('idProductoVenta', sql.Int, idProductoVenta)
                .input('idProducto', sql.Int, idProducto)
                .input('cantidad', sql.Int, cantidad)
                .execute(`SP_DELETE_PRODUCTO_VENTA`);
                const filasAfectadas = result.recordset[0]?.filasAfectadas || 0;

                return filasAfectadas;
        } catch (error) {
            console.error('Error en eliminar producto:', error);
            throw new Error('Error en eliminar producto');
        }
    }

}
