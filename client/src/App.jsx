import "rsuite/dist/rsuite.min.css";
import "./styles/custom.css";
import "./styles/style.css";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";

//inventario
import Index from './components/Index.jsx'
import Detalles from "./features/inventario/pages/Detalles";
import IndexInventario from "./features/inventario/pages/index";
import Editar from "./features/inventario/pages/Editar";
import Agregar from "./features/inventario/pages/Agregar";
import Solicitudes from "./features/inventario/pages/Solicitudes";

//ventas
import IndexVentas from './features/ventas/pages/index.jsx'
import IndexCotizacion from "./features/ventas/pages/IndexCotizacion.jsx";
import Cotizar from "./features/ventas/pages/Cotizar.jsx";
import EditarCotizacion from "./features/ventas/pages/EditarCotizarcion.jsx";
import Venta from "./features/ventas/pages/Venta.jsx";

//Finanzas
import GastosOperativos from "./features/finanzas/pages/GastosOperativos.jsx";
import Dashboard from "./features/finanzas/pages/Dashboard.jsx";

//flujo
import IndexFlujo from "./features/flujo/pages/Index.jsx";
import AgregarOrden from './features/flujo/pages/Agregar.jsx';
import DetallesOrden from "./features/flujo/pages/Detalles.jsx";
import EditarOrden from "./features/flujo/pages/Editar.jsx";

//Trabajadores
import TrabajadoresIndex from "./features/trabajadores/pages/Index.jsx";
import AgregarTrabajador from "./features/trabajadores/pages/Agregar.jsx";
import EditarTrabajador from "./features/trabajadores/pages/Editar.jsx";

//administracion
import CrearPerfil from "./features/perfil/pages/CrearPerfil";

//imports clientes
import IndexCli from "./features/clientes/pages/IndexCli.jsx";
import ListarClientesPage from "./features/clientes/pages/ListarClientesPage.jsx";
import ListarEditClientesPage from "./features/clientes/pages/ListarEditClientePage.jsx";
import ListarElimClientesPage from "./features/clientes/pages/ListarElimClientePage.jsx";
import AgregarCliente from "./features/clientes/pages/AgregarCli.jsx";
import EditarCliente from "./features/clientes/pages/EditarCli.jsx";
import EliminarCliente from "./features/clientes/pages/Eliminar.jsx";

//imports vehiculos
import IndexVehi from "./features/vehiculos/pages/IndexVehi.jsx";
import ListarVehiculosPage from "./features/vehiculos/pages/ListarVehiculosPage.jsx";
import ListarEditVehiculosPage from "./features/vehiculos/pages/ListarEditVehiculosPage.jsx";
import ListarElimVehiculosPage from "./features/vehiculos/pages/ListarElimVehiculosPage.jsx";

import AgregarVehiculo from "./features/vehiculos/pages/AgregarVehiculo.jsx";
import EditarVehiculo from "./features/vehiculos/pages/EditarVehiculo.jsx";
import EliminarVehiculo from "./features/vehiculos/pages/EliminarVehiculo.jsx"

const App = () => {
  return (
    <div className="app">
      <Header />

      <main style={{ minHeight: "95vh" }}>

        {/* ******************
          
          Usar el url:
          /[modulo]-acción 

          ****************** */}

        <Routes>
          <Route path="/" element={<Index />} />

          {/* Rutas para inventario */}
          <Route path="/inventario-agregar" element={<Agregar />} />
          <Route path="/inventario" element={<IndexInventario />} />
          <Route path="/inventario-detalles/:idProducto" element={<Detalles />} />{/* :id para esperar recibir un id */}
          <Route path="/inventario-editar/:idProducto" element={<Editar />} />{/* :id para esperar recibir un id */}
          <Route path="/solicitudes/" element={<Solicitudes />} />

          {/* FLUJO */}
          <Route path="/flujo" element={<IndexFlujo />} />
          <Route path="/flujo-agregar" element={<AgregarOrden />} />
          <Route path="/flujo-detalles/:idOrden" element={<DetallesOrden />} />
          <Route path="/flujo-editar/:idOrden" element={<EditarOrden />} />

          {/* Ventas */}
          <Route path="/ventas" element={<IndexVentas />} />
          <Route path="/cotizacion" element={<IndexCotizacion />} />
          <Route path="/cotizacion-cotizar" element={<Cotizar />} />
          <Route path="/cotizacion-editar/:idCotizacion" element={<EditarCotizacion />} />
          <Route path="/detalles/:idVenta" element={<Venta />} />

          {/* Finanzas */}
          <Route path="/gastos-operativos" element={<GastosOperativos />} />
          <Route path="/Dashboard" element={<Dashboard />} />

          {/* Ruta para trabajadores*/}
          <Route path="/trabajadores" element={<TrabajadoresIndex />} />
          <Route path="/trabajadores-agregar" element={<AgregarTrabajador />} />
          <Route path="/trabajadores-editar/:idTrabajador" element={<EditarTrabajador />} />

          {/* Ruta para perfil */}
          <Route path="/perfil-crear" element={<CrearPerfil />} />

          {/* Rutas para clientes */}
          <Route path="/clientes/Index" element={<IndexCli />} />
          <Route path="/clientes/obtenerclientes" element={<ListarClientesPage />} />
          <Route path="/clientes/list-edit" element={<ListarEditClientesPage />} />
          <Route path="/clientes/list-elim" element={<ListarElimClientesPage />} />

          <Route path="/clientes/registrar" element={<AgregarCliente />} />
          <Route path="/clientes/editar/:cedula" element={<EditarCliente />} />
          <Route path="/clientes/eliminar/:cedula" element={<EliminarCliente />} />

          {/* Rutas para Vehiculos */}
          <Route path="/vehiculos/Index" element={<IndexVehi />} />

          <Route path="/vehiculos/listarVehiculos" element={<ListarVehiculosPage />} />
          <Route path="/vehiculos/ListEditVehi" element={<ListarEditVehiculosPage />} />
          <Route path="/vehiculos/ListElimVehi" element={<ListarElimVehiculosPage />} />


          <Route path="/vehiculos/registrar" element={<AgregarVehiculo />} />
          <Route path="/vehiculos/editar/:idVehiculo" element={<EditarVehiculo />} />
          <Route path="/vehiculos/eliminar/:idVehiculo" element={<EliminarVehiculo />} />




        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
