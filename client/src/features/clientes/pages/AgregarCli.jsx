import React from "react";
import CreateForm from "../components/CreateForm";
import "../styles/agregar.css";

const AgregarCliente = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agregar Cliente</h1>
      <CreateForm />
    </div>
  );
};

export default AgregarCliente;
