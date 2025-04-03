import React, { useState, useEffect } from "react";
import axios from "axios";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//constante de opciones
const SelectCategoria = ({ value, onChange }) => {
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/categorias`);
        setOpciones(data);
      } catch (error) {
        console.error("Error obteniendo las categorías:", error);
      }
    };
  
    obtenerCategorias();
  }, []);

  return (
    <div className="">
      <select id="categoria" name="categoria" className="form-select" value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {opciones.map((categoria) => (
          <option key={categoria.idCategoria} value={categoria.nombreCategoria}>
            {categoria.nombreCategoria}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCategoria;
