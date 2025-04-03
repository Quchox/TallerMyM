import React from "react";
import ListarClientes from "../components/ListarClientes";
import "../styles/agregar.css";

const ListarClientesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clientes Registrados</h1>
      <ListarClientes />
    </div>
  );
};

export default ListarClientesPage;