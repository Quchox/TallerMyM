import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Text } from 'rsuite';
import Swal from "sweetalert2";
const { Column, HeaderCell, Cell } = Table;
import { useNavigate } from 'react-router-dom';
import axios from "axios";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListadoOrdenes = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        idOrden: 0,
        detalles: ""
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //GET ORDENES
    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const getOrdenes = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/flujo/obtener-ordenes/${4}`,);
                setDatos(data);
                //console.log(data);

            } catch (error) {
                console.error("Error al obtener Ordenes:", error);
            }
        };
        getOrdenes();
    }, []);

    const verificarMetodoPago = () => {
        if (!formData.tipoPago.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Debe seleccionar un método de pago'
            });
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    //funcion innecesaria, abrir modal desde btn tabla
    async function GenerarVenta(id) {
        await setFormData({
            ...formData,
            idOrden: id, // asignar el id de la orden seleccionada
        });
        handleOpen(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(formData);

        if (verificarMetodoPago()) {
            axios.post(`${BASE_URL}/ventas/registrar-venta/`, formData).then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Venta generada correctamente",
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    handleOpen(false);
                    handleClose(true);

                });
            }).catch((error) =>
                Swal.fire({
                    icon: "error",
                    title: "Error al generar venta",
                    text: error,
                    showConfirmButton: false,
                    timer: 1000,
                })
            );
        }
    };

    return (
        <div>
            <Table
                width={1300}
                height={800}
                data={datos}
            >
                <Column width={250}>
                    <HeaderCell className="text-center">Codigo de Orden</HeaderCell>
                    <Cell className="text-center" dataKey="codigoOrden" />
                </Column>

                <Column width={250}>
                    <HeaderCell className="text-center">Fecha de ingreso</HeaderCell>
                    <Cell className="text-center" dataKey="fechaIngreso" />
                </Column>

                <Column width={200}>
                    <HeaderCell className="text-center">Cliente</HeaderCell>
                    <Cell className="text-center" dataKey="nombreCliente" />
                </Column>
                <Column width={509} fixed="right">
                    <HeaderCell className="text-center">Accion</HeaderCell>

                    <Cell className="text-center" style={{ padding: '6px' }}>
                        {rowData => (
                            <Button className="btn btn-sm text-white btn-secondary rounded-1"
                                onClick={() => GenerarVenta(rowData.idOrden)}>
                                Generar Venta
                            </Button>
                        )}
                    </Cell>
                </Column>
            </Table>

            <Modal open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="px-3 pt-3">
                        <Modal.Title className="text-center">
                            <Text size="xxl" className="text-secondary">
                                Generar venta
                            </Text>
                        </Modal.Title>
                        <hr className="text-secondary" />
                    </Modal.Header>
                    <Modal.Body className="px-3">
                        <div>
                            <span>Detalles:</span>
                            <textarea
                                name="detalles"
                                className="form-control form-control-sm"
                                rows={4}
                                placeholder="Espacio opcional"
                                onChange={handleChange}
                                value={formData.detalles}
                            ></textarea>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-3 mb-3">
                        <Button appearance="primary" type="submit">
                            Generar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
}
export default ListadoOrdenes;
