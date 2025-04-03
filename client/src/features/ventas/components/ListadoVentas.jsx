import React, { useState, useEffect } from "react";
import { Table, Button, Text } from 'rsuite';
import Swal from "sweetalert2";
const { Column, HeaderCell, Cell } = Table;
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListadoVentas = () => {
    const navigate = useNavigate();
    const [filtroData, setFiltroData] = useState({
        nombreCliente: "",
        codigoOrden: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltroData({
            ...filtroData,
            [name]: value || ""
        });
    };

    //GET Ventas
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const getOrdenes = async () => {
            try {
                const { data } = await axios.post(`${BASE_URL}/ventas/obtener-ventas`,filtroData);
                setDatos(data);
                //console.log(data);

            } catch (error) {
                console.error("Error al obtener Ordenes:", error);
            }
        };
        getOrdenes();
    }, [filtroData]);

    return (
        <div>

            <div className="d-flex gap-4 ms-4">
                <span>
                    Orden:
                    <input className="form-control form-control-sm"
                    name="codigoOrden"
                    type="text" 
                    value={filtroData.codigoOrden}
                    onChange={handleChange}
                    />
                </span>
                <span>
                    Cliente:
                    <input className="form-control form-control-sm"
                    name="nombreCliente"
                    type="text" 
                    value={filtroData.nombreCliente}
                    onChange={handleChange}
                    />
                </span>
            </div>
            <Table
                width={1300}
                height={800}
                data={datos}
            >
                <Column width={200}>
                    <HeaderCell className="text-center">Codigo de Orden</HeaderCell>
                    <Cell className="text-center" dataKey="codigoOrden" />
                </Column>

                <Column width={200}>
                    <HeaderCell className="text-center">Cliente</HeaderCell>
                    <Cell className="text-center" dataKey="nombreCliente" />
                </Column>

                <Column width={200}>
                    <HeaderCell className="text-center">Fecha de venta</HeaderCell>
                    <Cell className="text-center">
                        {rowData => {
                            const fecha = new Date(rowData.fechaVenta);
                            return `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;
                        }}
                    </Cell>
                </Column>

                <Column width={200}>
                    <HeaderCell className="text-center">Pago</HeaderCell>
                    <Cell className="text-center" dataKey="tipoPago" />
                </Column>

                <Column width={200}>
                    <HeaderCell className="text-center">Monto total</HeaderCell>
                    <Cell className="text-center" dataKey="montoTotal" />
                </Column>

                <Column width={200} fixed="right">
                    <HeaderCell className="text-center">Accion</HeaderCell>

                    <Cell className="text-center" style={{ padding: '6px' }}>
                        {rowData => (
                            <Link className="btn btn-sm text-white btn-secondary rounded-1"
                                to={`/detalles/${rowData.idVenta}`}>
                                Gestionar Venta
                            </Link>
                        )}
                    </Cell>
                </Column>
            </Table>
        </div>

    );
}
export default ListadoVentas;
