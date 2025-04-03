import React from "react";
import ListarEditVehiculos from "../components/ListarEditVehiculos";
import "../styles/agregar.css";

const ListarEditVehiculosPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Vehiculos Registrados</h1>
      <ListarEditVehiculos />
    </div>
  );
};

export default ListarEditVehiculosPage;