import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir a la página de edición

const ListarElimClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroCedula, setFiltroCedula] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  // Función para obtener todos los clientes
  const obtenerClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/clientes/obtenerclientes");
      setClientes(response.data);
      setError("");
    } catch (error) {
      console.error("Error al obtener clientes:", error);
      setError("Error al obtener clientes");
    } finally {
      setLoading(false);
    }
  };

  // Obtener clientes al cargar el componente
  useEffect(() => {
    obtenerClientes();
  }, []);

  // Filtrar clientes por cédula
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.cedula.includes(filtroCedula)
  );

  // Función para redirigir a la página de edición
  const handleEliminar = (cedula) => {
    navigate(`/clientes/eliminar/${cedula}`); // Redirige a la página de edición
  };

  if (loading) {
    return <p>Cargando clientes...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por cédula"
          value={filtroCedula}
          onChange={(e) => setFiltroCedula(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {/* Tabla de clientes */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Apellido</th>
            <th className="py-2 px-4 border">Cédula</th>
            <th className="py-2 px-4 border">Correo</th>
            <th className="py-2 px-4 border">Teléfono</th>
            <th className="py-2 px-4 border">Acciones</th> {/* Nueva columna */}
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.idCliente}>
              <td className="py-2 px-4 border">{cliente.nombre}</td>
              <td className="py-2 px-4 border">{cliente.apellido}</td>
              <td className="py-2 px-4 border">{cliente.cedula}</td>
              <td className="py-2 px-4 border">{cliente.correo}</td>
              <td className="py-2 px-4 border">{cliente.telefono}</td>
              <td className="py-2 px-4 border">
                {/* Botón de editar */}
                <button
                  onClick={() => handleEliminar(cliente.cedula)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {clientesFiltrados.length === 0 && filtroCedula && (
        <p className="text-red-500 mt-4">No se encontraron clientes con esa cédula.</p>
      )}
    </div>
  );
};

export default ListarElimClientes;