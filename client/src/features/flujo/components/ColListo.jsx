import React, { useState, useEffect } from "react";
import axios from "axios";
import {VStack} from "rsuite";
import Orden from "./Orden";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ColListo = () => {
    const [datos, setDatos] = useState([]);
    useEffect(() => {
      const getOrdenes = async () => {
        try {
          const { data } = await axios.get(`${BASE_URL}/flujo/obtener-ordenes/${3}`,);
          setDatos(data);
        } catch (error) {
          console.error("Error al obtener Ordenes:", error);
        }
      };
      getOrdenes();
    }, []);
    
  return (
    <VStack className="d-grid gap-3" spacing={10} style={{ all: 'unset' }}>

      <Orden datos={datos}/>

    </VStack>
  );
};
export default ColListo;
