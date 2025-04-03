import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { InputPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/Spinner';

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectClientes = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
      const fetchClientes = async () => {
          try {
              const { data } = await axios.get(`${BASE_URL}/clientes/obtenerclientes`);
              const opcionesFormateadas = data.map(cliente => ({
                  value: cliente.idCliente,
                  label: `${cliente.nombre} ${cliente.apellido}`,
              }));
              setOpciones(opcionesFormateadas);
          } catch (error) {
              console.error("Error obteniendo los clientes:", error);
          }
      };
      
      fetchClientes();
  }, []);

  useEffect(() => {
      if (value) {
          const selected = opciones.find(opcion => opcion.value === value) || null;
          setSelectedOption(selected);
      }
  }, [value, opciones]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    
    if (typeof onChange === "function") {
        onChange({
            target: {
                name: "clienteSeleccionado",
                value: selectedOption ? selectedOption.value : "",
            },
        });
    }
};

  return (
      <Select
          id="clienteSeleccionado"
          options={opciones}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Seleccionar Cliente"
          noOptionsMessage={() => "No hay clientes disponibles"}
          maxMenuHeight={140}
      />
  );
};

export default SelectClientes;