import React from "react";
import ListarEditClientes from "../components/ListarEditClientes";
import "../styles/agregar.css";

const ListarEditClientesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clientes Registrados</h1>
      <ListarEditClientes />
    </div>
  );
};

export default ListarEditClientesPage;