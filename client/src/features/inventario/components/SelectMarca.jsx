import React, { useState, useEffect } from "react";
import axios from "axios";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//constante de opciones
const SelectMarca = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerMarcas = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/marcas/`);
        setOpciones(data);
      } catch (error) {
        console.error("Error obteniendo las Marcas:", error);
      }
    };

    obtenerMarcas();
  }, []);

  return (
    <div className="">
      <select id="marca" name="marca" className="form-select" value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {opciones.map((Marca) => (
          <option key={Marca.idMarca} value={Marca.nombreMarca}>
            {Marca.nombreMarca}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMarca;
