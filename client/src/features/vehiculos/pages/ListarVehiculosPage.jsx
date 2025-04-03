import React from "react";
import Listar from "../components/ListarVehiculos";
import "../styles/agregar.css";

const ListarVehiculosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vehiculos Registrados</h1>
      <Listar />
    </div>
  );
};

export default ListarVehiculosPage;