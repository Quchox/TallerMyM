import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para redirigir a la página de edición

const ListarEditVehiculos = () => {
   const [vehiculos, setVehiculos] = useState([]); // Todos los vehículos
   const [loading, setLoading] = useState(true); // Estado para manejar la carga
   const [error, setError] = useState(""); // Estado para manejar errores
   const [filtroPlaca, setFiltroPlaca] = useState(""); // Estado para el filtro de placa
   const navigate = useNavigate(); // Hook para redirigir

   // Función para obtener todos los vehículos
   const ObtenerVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/vehiculos/ObtenerVehiculos");
      setVehiculos(response.data); // Guardar los vehículos en el estado
      setError(""); // Limpiar el mensaje de error
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
      setError("Error al obtener vehículos"); // Mostrar mensaje de error
    } finally {
      setLoading(false); // Finalizar la carga
    }
  };

  // Obtener vehículos al cargar el componente
  useEffect(() => {
    ObtenerVehiculos();
  }, []);


  // Filtrar vehículos por placa
  const vehiculosFiltrados = vehiculos.filter((vehiculo) =>
    vehiculo.placaVehiculo.toLowerCase().includes(filtroPlaca.toLowerCase())
  );

  // Función para redirigir a la página de edición
  const handleEditar = (idVehiculo) => {
    navigate(`/vehiculos/editar/${idVehiculo}`); // Redirige a la página de edición
  };

  if (loading) {
    return <p>Cargando Vehiculos...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      
     {/* Campo de búsqueda por placa */}
     <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por placa (ej: abc123)"
          value={filtroPlaca}
          onChange={(e) => setFiltroPlaca(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Tabla de clientes */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
          <th className="py-2 px-4 border">Placa</th>
            <th className="py-2 px-4 border">Modelo</th>
            <th className="py-2 px-4 border">Marca</th>
            <th className="py-2 px-4 border">Año</th>
            <th className="py-2 px-4 border">Tipo</th>
            <th className="py-2 px-4 border">ID Cliente</th>
          </tr>
        </thead>
        <tbody>
        {vehiculosFiltrados.map((vehiculo) => (
            <tr key={vehiculo.idVehiculo}>
              <td className="py-2 px-4 border">{vehiculo.placaVehiculo}</td>
              <td className="py-2 px-4 border">{vehiculo.modeloVehiculo}</td>
              <td className="py-2 px-4 border">{vehiculo.marcaVehiculo}</td>
              <td className="py-2 px-4 border">{vehiculo.annoVehiculo}</td>
              <td className="py-2 px-4 border">{vehiculo.tipoVehiculo}</td>
              <td className="py-2 px-4 border">{vehiculo.idCliente}</td>

              <td className="py-2 px-4 border">
                {/* Botón de editar */}
                <button
                  onClick={() => handleEditar(vehiculo.idVehiculo)}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Editar
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {/* Mensaje si no hay coincidencias */}
      {vehiculosFiltrados.length === 0 && filtroPlaca && (
        <p className="text-red-500 mt-4">No se encontraron vehículos con esa placa.</p>
      )}
    </div>
  );
};

export default ListarEditVehiculos;