import React from "react";
import CreateForm from "../components/CreateForm";
import "../styles/agregar.css";

const AgregarVehiculo = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Vehiculo</h1>
      <CreateForm />
    </div>
  );
};

export default AgregarVehiculo;
