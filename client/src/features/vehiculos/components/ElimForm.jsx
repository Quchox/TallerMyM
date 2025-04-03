import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ElimForm = () => {
  const { idVehiculo } = useParams();
   // Obtener el idCliente de la URL
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState({
    placaVehiculo: "",
    modeloVehiculo: "",
    marcaVehiculo: "",
    annoVehiculo: "",
    tipoVehiculo: "",
    idCliente: "",
  });
  

  // Obtener los datos del cliente al cargar el componente
  useEffect(() => {
    const obtenerVehiculo = async () => {
      try {
       
        //implementar obtener un cliente por id /ocupo primero cargar los datos
        const response = await axios.get(`http://localhost:3000/vehiculos/ObteneridVehiculo/${idVehiculo}`);
        setVehiculo(response.data);
      } catch (error) {
        console.error("Error al obtener el Vehiculo:", error);
        alert("Error al obtener los datos del Vehiculo");
      }
    };
    obtenerVehiculo();
  }, [idVehiculo]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiculo({...vehiculo, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/vehiculos/eliminar/${idVehiculo}`);//!!
      alert("Vehiculo actualizado exitosamente");
      navigate("/vehiculos/ListEditVehi"); // Redirigir a la lista de vehiculos (edición)
    } catch (error) {
      console.error("Error al actualizar el vehiculo:", error);
      alert("Error al eliminar el vehiculo");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Editar Vehiculo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block">Placa Vehiculo:</label>
          <input
            type="text"
            name="placaVehiculo"
            value={vehiculo.placaVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Modelo del Vehiculo:</label>
          <input
            type="text"
            name="modeloVehiculo"
            value={vehiculo.modeloVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Marca del Vehiculo:</label>
          <input
            type="text"
            name="marcaVehiculo"
            value={vehiculo.marcaVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Año del Vehiculo:</label>
          <input
            type="text"
            name="annoVehiculo"
            value={vehiculo.annoVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Tipo de Vehiculo:</label>
          <input
            type="text"
            name="tipoVehiculo"
            value={vehiculo.tipoVehiculo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block">Id cliente:</label>
          <input
            type="number"
            name="idCliente"
            value={vehiculo.idCliente}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Eliminar
        </button>
      </form>
    </div>
  );
};

export default ElimForm;