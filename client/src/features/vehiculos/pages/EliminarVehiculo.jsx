import React from "react";
import ElimForm from "../components/ElimForm";
import "../styles/eliminar.css";

const EliminarVehiculo = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Eliminar Vehiculo</h1>
      <ElimForm />
    </div>
  );
};

export default EliminarVehiculo;
