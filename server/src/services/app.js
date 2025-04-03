"use strict";
require('dotenv').config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const imgRoutes_1 = __importDefault(require("../routes/inventario/imgRoutes"));
const categoriaRoutes_1 = __importDefault(require("../routes/inventario/categoriaRoutes"));
const marcaRoutes_1 = __importDefault(require("../routes/inventario/marcaRoutes"));
const proveedorRoute_1 = __importDefault(require("../routes/inventario/proveedorRoute"));
const vehiculosCompatiblesRoutes_1 = __importDefault(require("../routes/inventario/vehiculosCompatiblesRoutes"));
const productoRoutes_1 = __importDefault(require("../routes/inventario/productoRoutes"));
const solicitudRoutes_1 = __importDefault(require("../routes/inventario/solicitudRoutes"));
const usuarioRoutes_1 = __importDefault(require("../routes/perfil/usuarioRoutes"));
const ordenRoutes = require("../routes/flujo/ordenRoutes");
const cotizacionRoutes = require("../routes/ventas/cotizacionRoutes");
const trabajadoresRoutes = require("../routes/trabajadores/trabajadoresRoutes");
const ventasRoutes = require("../routes/ventas/ventasRoutes");
const notificacionesRoutes = require("../routes/notificaciones/notificacionesRoutes")
const ClienteRoutes_1 = __importDefault(require("../routes/clientes/clienteRoutes"));
const VehiculoRoute_1 = __importDefault(require("../routes/vehiculos/vehiculosRoutes"));
const pagoClienteRoutes = require("../routes/finanzas/pagoClienteRoutes");
const devolucionRoutes = require("../routes/finanzas/devolucionRoutes");
const Usuario_1 = __importDefault(require("../models/usuario/usuario"));
const database_1 = require("../config/database");
const gastoOperativoRoutes = require("../routes/finanzas/gastoOperativoRoutes");
const reportesRoutes = require("../routes/reportes/reportesRoutes")
const dashboardRoutes = require("../routes/finanzas/dashboardRoutes");

const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware
const PORT = 3000; // Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
app.use((0, cors_1.default)({ 
    origin: "http://localhost:5173",
    methods: 'GET, POST, PUT, PATCH, DELETE',
}));
(0, database_1.connectDB)() // conexion BD
    .then(() => console.log("Conectado a la base de datos"))
    .catch((err) => {
    if (err instanceof Error) {
        console.error("Error en la conexión:", err.message);
    }
    else {
        console.error("Error en la conexión:", err);
    }
});
//* Rutas Inventario
app.use("/categorias", categoriaRoutes_1.default);
app.use("/marcas", marcaRoutes_1.default);
app.use("/proveedor", proveedorRoute_1.default);
app.use("/vehiculos-compatibles", vehiculosCompatiblesRoutes_1.default);
app.use("/productos", productoRoutes_1.default);
app.use("/img", imgRoutes_1.default);
app.use("/inventario", solicitudRoutes_1.default);

//Rutas notificaciones
app.use("/notificaciones", notificacionesRoutes);

//Rutas Ventas
app.use("/cotizacion",cotizacionRoutes);
app.use("/ventas",ventasRoutes);

//Finanzas
app.use("/finanzas",pagoClienteRoutes);
app.use("/finanzas",devolucionRoutes);
app.use("/finanzas",gastoOperativoRoutes);
app.use("/finanzas",dashboardRoutes);
//trabajadores
app.use("/trabajadores",trabajadoresRoutes);

//* Rutas Perfil

// Ruta de Usuario Api
app.use("/api/usuario", usuarioRoutes_1.default);
app.use("/usuario", Usuario_1.default);
//Ruta modulo de clientes
app.use("/clientes", ClienteRoutes_1.default);
//Ruta modulo Vehiculos
app.use("/vehiculos", VehiculoRoute_1.default);

//Ruta flujo-ordenes
app.use("/flujo",ordenRoutes);

//reportes
app.use("/reportes",reportesRoutes);