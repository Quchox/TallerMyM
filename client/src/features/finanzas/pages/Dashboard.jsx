import React, { useState, useEffect } from "react";
import { Stat, StatGroup, HStack } from "rsuite";
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const [finanzas, setFinanzas] = useState(null);
  const [gastos, setGastos] = useState(null);

  useEffect(() => {
    const getFinanzas = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/finanzas/obtener-ganancia-mes/`);
        setFinanzas(response.data);
      } catch (error) {
        console.error("Error al obtener ingresos:", error);
      }
    };

    const getGastos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/finanzas/obtener-gasto-mes/`); // <-- Corrige la URL si es necesario
        setGastos(response.data);
      } catch (error) {
        console.error("Error al obtener gastos:", error);
      }
    };

    getFinanzas();
    getGastos();
  }, []);

  return (
    <div className="container mt-5">
      <StatGroup>
        {/* Ingresos */}
        <Stat>
          <Stat.Label>Ingresos del mes anterior</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>{finanzas?.totalMesAnterior?.toLocaleString() ?? "Cargando..."}</Stat.Value>
          </HStack>
        </Stat>

        <Stat>
          <Stat.Label>Ingresos de este mes</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>{finanzas?.totalMesActual?.toLocaleString() ?? "Cargando..."}</Stat.Value>
            <Stat.Trend 
              indicator={finanzas?.diferenciaPorcentaje > 0 ? "up" : "down"}
            >
              {finanzas?.diferenciaPorcentaje?.toFixed(2) ?? "0"}%
            </Stat.Trend>
          </HStack>
        </Stat>

        {/* Gastos */}
        <Stat>
          <Stat.Label>Gastos del mes anterior</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>{gastos?.totalMesAnterior?.toLocaleString() ?? "Cargando..."}</Stat.Value>
          </HStack>
        </Stat>

        <Stat>
          <Stat.Label>Gastos de este mes</Stat.Label>
          <HStack spacing={10}>
            <Stat.Value>{gastos?.totalMesActual?.toLocaleString() ?? "Cargando..."}</Stat.Value>
            <Stat.Trend 
              indicator={gastos?.diferenciaPorcentual > 0 ? "up" : "down"}
            >
              {gastos?.diferenciaPorcentual?.toFixed(2) ?? "0"}%
            </Stat.Trend>
          </HStack>
        </Stat>
      </StatGroup>
    </div>
  );
};

export default Dashboard;
