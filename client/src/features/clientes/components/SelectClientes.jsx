import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import axios from "axios";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectClientes = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/clientes/obtenerclientes`);
        const opcionesFormateadas = data.map((cliente) => ({
          value: cliente.idCliente,
          label: `${cliente.nombre} ${cliente.apellido}`,//Nombre + apellido
        }));
        setOpciones(opcionesFormateadas);
      } catch (error) {
        console.error("Error obteniendo los clientes:", error.message);
      }
    };

    obtenerClientes();
  }, []);

  const handleChange = useCallback(
    (selectedOption) => {
      onChange({
        target: {
          name: "idCliente",
          value: selectedOption ? selectedOption.value : null,
        },
      });
    },
    [onChange]
  );

  return (
    <div>
      <Select
        id="idCliente"
        name="idCliente"
        options={opciones}
        value={opciones.find((opcion) => opcion.value === value) || null} // Buscar el objeto correctamente
        onChange={handleChange}
        placeholder="Seleccione un cliente..."
        noOptionsMessage={() => "No hay clientes disponibles"}
        maxMenuHeight={185}
      />
    </div>
  );
};

export default SelectClientes;
