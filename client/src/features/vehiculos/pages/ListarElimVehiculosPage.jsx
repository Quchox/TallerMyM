import React from "react";
import ListarElimVehiculos from "../components/ListarElimVehiculos";
import "../styles/agregar.css";

const ListarElimVehiculosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vehiculos Registrados</h1>
      <ListarElimVehiculos />
    </div>
  );
};

export default ListarElimVehiculosPage;