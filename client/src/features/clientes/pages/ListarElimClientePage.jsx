import React from "react";
import ListarElimClientes from "../components/ListarElimClientes";
import "../styles/agregar.css";

const ListarEditClientesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clientes Registrados</h1>
      <ListarElimClientes />
    </div>
  );
};

export default ListarEditClientesPage;