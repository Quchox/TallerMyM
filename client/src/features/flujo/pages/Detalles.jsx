import React, { useState, useEffect, useMemo } from "react";
import { Grid, Row, Col, Steps, Text, Divider } from "rsuite";
import "../styles/flu.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const styles = {
    width: '400px',
    display: 'inline-table',
    verticalAlign: 'top'
};
const Detalles = () => {
    const { idOrden } = useParams();
    const navigate = useNavigate(); // Hook para navegar
    const [orden, setOrden] = useState([]);
    const [fase, setFase] = useState({
        idOrden: idOrden,
        estadoOrden: 0
    });
    const [reload, setReload] = useState(0);

    useEffect(() => {
        const obtenerOrden = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}/flujo/obtener-orden/${idOrden}`
                ); //consumir api en backend por id
                setOrden(data);
                setFase((prev) => ({ ...prev, estadoOrden: data.estadoOrden }));

                //console.log(data); // imprimir JSON en consola
            } catch (error) {
                console.error("Error al obtener el orden:", error);
            }
        };

        obtenerOrden(); // llamar funcion
    }, [idOrden, reload]);//cargar al tener id // al cambiar fase

    //numero de estado ==> texto de proximo estado
    const estadoTexto = useMemo(() => {
        const estados = {
            0: "Pendiente",
            1: "En progreso",
            2: "Finalizado",
            3: "Venta",
        };
        return estados[fase.estadoOrden]; // No hay "default"
    }, [fase.estadoOrden]);

    const siguienteFase = async () => {
        try {
            const result = await Swal.fire({
                text: `Avanzar orden a la fase "${estadoTexto}"?`,
                icon: "warning",
                confirmButtonText: 'Confirmar',
                showConfirmButton: true,
                showCancelButton: true,
                customClass: {
                    actions: 'my-actions',
                    confirmButton: 'btn btn-success btn-sm text-white order-2',
                    cancelButton: 'btn btn-sm btn-outline-dark order-1',
                },
            });

            if (result.isConfirmed) {
                const resFase = await axios.put(`${BASE_URL}/flujo/actualizar-fase-orden/`, fase); // Consumir API

                if (resFase.status === 200) {
                    Swal.fire({
                        title: 'Orden actualizada!',
                        icon: 'success',
                        showConfirmButton: false
                    });
                    setReload(reload + 1); // Recargar página para ver cambios
                }
            }
        } catch (error) {
            Swal.fire({
                title: 'Error al actualizar orden!',
                icon: 'error',
                showConfirmButton: false
            });
            console.error("Error al actualizar fase:", error);
        }
    };


    return (
        <div className="container main p-5">
            <Grid fluid>
                <Row
                    className="show-grid d-flex justify-content-center align-items-center"
                    gutter={16}
                >
                    <Col
                        xs={16}
                        className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
                    >
                        <Row className="mx-auto justify-content-center text-center">
                            <Text size="xxl" color="blue">Código orden:</Text>
                            <Text size="lg" muted>{orden.codigoOrden}</Text>
                        </Row>
                        <Divider className="m-0 text bg-primary opacity-25" />
                        <Row className="show-grid" gutter={16}>
                            <Col xs={10} className="column">
                                <Steps current={orden.estadoOrden - 1} vertical style={styles}>
                                    <Steps.Item title="Pendiente" description=" " />
                                    <Steps.Item title="En progreso" description=" " />
                                    <Steps.Item title="Finalizado" description=" " />
                                    <Steps.Item title="Venta" description=" " />
                                </Steps>
                                <div className="d-grid justify-content-start me-5 gap-2 mt-5">
                                    <button
                                        onClick={siguienteFase}
                                        type="button"
                                        className="btn btn-success btn-sm text-white"
                                        style={{ maxWidth: "120px" }}
                                    >
                                        Siguiente Fase
                                    </button>
                                    <Link
                                        to={`/flujo-editar/${idOrden}`}
                                        className="btn btn-warning btn-sm text-white"
                                        style={{ maxWidth: "120px" }}
                                    >
                                        Editar Orden
                                    </Link>
                                    <Link
                                        to={`/flujo`}
                                        type="button"
                                        className="btn btn-muted btn-sm"
                                        style={{ maxWidth: "120px" }}
                                    >
                                        Volver Atrás
                                    </Link>

                                </div>
                            </Col>
                            <Col xs={2} className="column"></Col>
                            <Col xs={12} className="column align-items-bottom gap-4">
                                <span>
                                    <Text size="xl">Cliente:</Text>
                                    <Text size="lg" muted>{orden.nombreCliente}</Text>
                                </span>
                                <span>
                                    <Text size="xl">Mecánico:</Text>
                                    <Text size="lg" muted>{orden.nombreMecanico}</Text>
                                </span>
                                <span>
                                    <Text size="xl">Vehiculo:</Text>
                                    <Text size="lg" muted>{orden.vehiculo}</Text>
                                </span>
                                <span>
                                    <Text size="xl">Fecha de ingreso:</Text>
                                    <Text size="lg" muted>{orden.fechaIngreso}</Text>
                                </span>
                                <span>
                                    <Text size="xl">Estimado de finalización:</Text>
                                    <Text size="lg" muted>{orden.tiempoEstimado}</Text>
                                </span>
                                <span>
                                    <Text size="xl">Tiempo Restante:</Text>
                                    <Text size="lg" style={orden.estadoAtrasado === true ? { color: "#F50025" } : { color: "#717273" }}>
                                        {orden.TiempoRestante}
                                    </Text>
                                </span>
                                <span>
                                    <Text size="xl">Descripcion:</Text>
                                    <Text size="lg" muted>
                                        {orden.descripcion}
                                    </Text>
                                </span>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </div>
    );
};

export default Detalles;
