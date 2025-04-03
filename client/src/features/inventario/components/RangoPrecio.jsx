import React, { useState, useEffect } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import axios from "axios";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

export default function RangoPrecio({ value, onChange }) {
  const [precios, setPrecios] = useState([]);
  const [localValue, setLocalValue] = useState([0, 999999]);

  useEffect(() => {
    // traer min y max de api
    async function obtenerPrecios() {
      try {
        const response = await axios.get(`${BASE_URL}/productos/precios`);
        setPrecios(response.data);
      } catch (error) {
        console.error("Error obteniendo precios:", error);
      }
    }

    obtenerPrecios();
  }, []);

  // actualiza los valores
  useEffect(() => {
    if (precios.precioMin !== undefined && precios.precioMax !== undefined) {
      // establece el valor del slider con los valores obtenidos
      setLocalValue([precios.precioMin, precios.precioMax]);
    }
  }, [precios]);

  // actualiza el valor cuando el slider cambia
  const handleSliderChange = (newValue) => {
    setLocalValue(newValue);
    if (onChange) {
      onChange({ target: { name: "rangoPrecio", value: newValue } });
    }
  };

  return (
    <div>
      <span className="d-flex justify-self-start ms-2">Rango de precio:</span>
      <div className="labels d-flex justify-content-between mb-2 px-2">
        <span>Min: {localValue[0]} ₡</span>
        <span>Max: {localValue[1]} ₡</span>
      </div>
      <div className="slider-container">
        <RangeSlider
          name="rangoPrecio"
          min={precios.precioMin || 0} // Usar precioMin
          max={precios.precioMax || 9999999} // Usar precioMax
          value={localValue}
          onInput={handleSliderChange}
        />
      </div>
    </div>
  );
}
