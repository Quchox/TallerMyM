import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "rsuite";

// URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Devolucion = () => {
  const { idVenta } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null); // Inicializa con null para esperar la respuesta

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/finanzas/obtener-devolucion/${idVenta}`);
        setFormData(data); // Asigna los datos recibidos
        //console.log(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    obtenerDatos(); // Llamar la función para obtener los datos
  }, [idVenta]);

  if (!formData) {
    return <div></div>;
  }
  if (!formData.monto) {
    return <div></div>;
  }

  return (
    <div className="mt-3 d-flex flex-column gap-3">
      <span>
        <Text xs="lg">Monto reembolsado:</Text>
        <Text xs="lg" muted>{formData.monto}</Text>
      </span>
      <span>
        <Text xs="lg">Fecha de devolucion:</Text>
        <Text xs="lg" muted>{formData.fecha.split("T")[0]}</Text> {/* Solo muestra la fecha sin hora */}
      </span>
      <span>
        <Text xs="lg">Motivo:</Text>
        <Text xs="lg" muted>{formData.motivo || "No hay observaciones"}</Text>
      </span>
    </div>
  );
};

export default Devolucion;
