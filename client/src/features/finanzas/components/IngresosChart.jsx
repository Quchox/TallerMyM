import React, { useState, useEffect } from 'react';

import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL;

const IngresosChart = () => {
    const [datos, setDatos] = useState([]);

    useEffect(() => {
        const getDatos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/finanzas/obtener-gastos-operativos/`);
                setDatos(response.data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            }
        };

        getDatos();
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default IngresosChart;
