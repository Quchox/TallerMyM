import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "rsuite";

// URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Pago = () => {
  const { idVenta } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null); // Inicializa con null

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/finanzas/obtener-pago/${idVenta}`);
        setFormData(data); // Asigna el objeto recibido en lugar de un arreglo
        //console.log(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    obtenerDatos(); // Llamar a la función para obtener los datos
  }, [idVenta]);

  if (!formData) {
    return <div></div>; // No muestra nada si no hay resultados
  }

  // Verifica si formData tiene datos
  if (!formData.monto) {
    return <div></div>; // No muestra nada si no hay resultados
  }

  return (
    <div className="mt-3 d-flex flex-column gap-3">
      <span>
        <Text xs="lg">Monto pagado:</Text>
        <Text xs="lg" muted>{formData.monto}</Text>
      </span>
      <span>
        <Text xs="lg">Dinero vuelto:</Text>
        <Text xs="lg" muted>{formData.dineroVuelto}</Text>
      </span>
      <span>
        <Text xs="lg">Metodo de pago:</Text>
        <Text xs="lg" muted>{formData.metodoPago}</Text>
      </span>
      <span>
        <Text xs="lg">Fecha:</Text>
        <Text xs="lg" muted>{formData.fecha.split("T")[0]}</Text>
      </span>
    </div>
  );
};

export default Pago;
