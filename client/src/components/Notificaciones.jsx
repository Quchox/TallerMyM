import React, { useEffect, useState } from "react";
import { Button, Drawer, Notification, Stack, Text, Badge, Col, Message } from "rsuite";
import { IoIosNotifications } from "react-icons/io";
import '../styles/Notificaciones.css';
import { MdDeleteSweep } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Notificaciones = ({ modulo }) => {
    const [notificaciones, setNotificaciones] = useState([]);

    useEffect(() => {
        const obtenerNotificaciones = async () => {
            try {
                const { data } = await axios.post(`${BASE_URL}/notificaciones/obtener-notificaciones/`, { modulo });
                const listaDatos = data.map(noti => ({
                    idNotificacion: noti.idNotificacion,
                    titulo: noti.titulo,
                    cuerpo: noti.cuerpo,
                    fecha: noti.fecha.split('T')[0],
                    tipo: noti.tipo
                }));
                setNotificaciones(listaDatos);
            } catch (error) {
                console.error("Error al obtener notificaciones:", error);
            }
        }
        obtenerNotificaciones();
    }, [modulo]);

    const [open, setOpen] = React.useState(false);

    const Eliminar = async (idNotificacion) => {
        const result = await Swal.fire({
            title: "¿Descartar Notificación?",
            text: "¡Esta notificación desaparecerá de la lista!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
            axios.delete(`${BASE_URL}/notificaciones/eliminar-notificacion/${idNotificacion}`)
                .then(() => {
                    window.location.reload(); // Recargar la página después de eliminar
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error",
                        text: "Error al eliminar la notificación",
                        icon: "error",
                        showCancelButton: false,
                    });
                    console.error("Error al eliminar notificación:", error);
                });
        }
    };

    return (
        <div>
            {
                notificaciones.length > 0 ? (
                    <div className="badge-wrapper">
                        <Badge content={notificaciones.length} maxCount={99}>
                            <Button onClick={() => setOpen(true)} className="floating-button">
                                <IoIosNotifications size={28} />
                            </Button>
                        </Badge>
                    </div>
                ) : (
                    <Button onClick={() => setOpen(true)} className="floating-button">
                        <IoIosNotifications size={28} />
                    </Button>
                )
            }
            <div>
                <Drawer open={open} onClose={() => setOpen(false)}>
                    <Drawer.Header className="px-5 bg-dark">
                        <Drawer.Title className="text-white">Notificaciones ({notificaciones.length})</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body className="p-4 bg-dark">
                        <Stack spacing={10} direction="column" alignItems="flex-start" className="row ms-1 me-1">
                            {notificaciones.length > 0 ? (
                                notificaciones.map(noti => (
                                    <Notification key={noti.idNotificacion} className="rounded-4 row notification p-0"
                                        type={noti.tipo} header={noti.titulo}>
                                        <hr />
                                        <div className="d-flex align-items-center">
                                            <Col xs={20}>
                                                <Text size="md">{noti.cuerpo}</Text>
                                                <Text size="sm" muted>{noti.fecha}</Text>
                                            </Col>
                                            <Col xs={2} className="mx-auto">
                                                <Button className="btn-eliminar" onClick={() => Eliminar(noti.idNotificacion)}>
                                                    <MdDeleteSweep style={{ fontSize: "30px" }} />
                                                </Button>
                                            </Col>
                                        </div>
                                    </Notification>
                                ))
                            ) : (
                                <Message type="info" >
                                    <strong>Sin Notificaciones</strong> No tienes nuevas notificaciones en este momento.
                                </Message>
                            )}
                        </Stack>
                    </Drawer.Body>
                </Drawer>
            </div>
        </div>
    )
}
export default Notificaciones;