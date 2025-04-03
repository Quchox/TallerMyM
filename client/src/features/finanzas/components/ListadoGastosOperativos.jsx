import React, { useState, useEffect } from "react";
import swal from "sweetalert2";
import axios from "axios";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

export const ListadoGastosOperativos = () => {
    const [gastosOperativos, setGastosOperativos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${BASE_URL}/finanzas/obtener-gastos-operativos/`);
                setGastosOperativos(data);
                //console.log("Datos obtenidos:", data);
            } catch (error) {
               //console.error("Error al obtener datos:", error);
                setError("No se pudieron cargar los gastos operativos");
                swal.fire("Error", "No se pudieron cargar los gastos operativos", "error");
            } finally {
                setLoading(false);
            }
        };
        obtenerDatos();
    }, []);

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!gastosOperativos || gastosOperativos.length === 0) {
        return <div className="alert alert-info">No hay gastos operativos registrados.</div>;
    }

    return (
        <div className="">
            <h3>Listado Gastos Operativos</h3>

            <table className="table">
                <thead>
                    <tr>
                        <th>Tipo de Gasto</th>
                        <th>Monto</th>
                        <th>Detalle</th>
                        <th>Proveedor</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {gastosOperativos.map((gasto, index) => (
                        <tr key={gasto._id || index}>
                            <td>{gasto.tipoGasto}</td>
                            <td>₡ {gasto.monto?.toLocaleString('es-CR') || 0}</td>
                            <td>{gasto.detalle}</td>
                            <td>{gasto.proveedor?.nombre || gasto.proveedor || "N/A"}</td>
                            <td>{new Date(gasto.fecha).toLocaleDateString('es-CR')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoGastosOperativos;