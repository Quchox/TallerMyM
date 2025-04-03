import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { InputPicker } from 'rsuite';
import SpinnerIcon from '@rsuite/icons/Spinner';

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectTrabajadores = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
      const fetchTrabajadores = async () => {
          try {
              const { data } = await axios.get(`${BASE_URL}/trabajadores/obtener-trabajadores`);
              const opcionesFormateadas = data.map(trabajador => ({
                  value: trabajador.idTrabajador,
                  label: `${trabajador.nombreCompleto}`,
              }));
              setOpciones(opcionesFormateadas);
          } catch (error) {
              console.error("Error obteniendo los Trabajadores:", error);
          }
      };
      
      fetchTrabajadores();
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
                name: "trabajadorSeleccionado",
                value: selectedOption ? selectedOption.value : "",
            },
        });
    }
};

  return (
      <Select
          id="trabajadorSeleccionado"
          options={opciones}
          value={selectedOption}
          onChange={handleChange}
          placeholder="Seleccionar Mecánico"
          noOptionsMessage={() => "No hay Trabajadores disponibles"}
          maxMenuHeight={140}
      />
  );
};

export default SelectTrabajadores;