import { Card, Text, Row, Col } from "rsuite";
import { Link } from "react-router-dom";

const Orden = ({ datos }) => {
    //console.log(datos);
    return (
        datos.map((orden) => (
            <Link key={orden.idOrden} to={`/flujo-detalles/${orden.idOrden}`}>
                <Card size="sm" className="card border-1 shadow-sm border-secondary p-0">
                    <Row className="card-header p-0 mb-1" style={orden.estadoAtrasado === true ? { backgroundColor: "#850025", height: "100px" } : { color: "white", height: "100px" }}>
                        <Col xs={12}>
                            <Card.Header as="h6" className=" ms-3 text-white">
                                <Text size="xl" className="text-start mb-1" weight="semibold" style={{ color: "#FFF" }}>Orden:</Text>
                                <Text size="lg" className="text-start" weight="medium" style={{ color: "#FFF" }}>{orden.codigoOrden}</Text>
                            </Card.Header>
                        </Col>
                        <Col xs={12}>
                            <Card.Header as="h6" className="text-white" >
                                <Text size="xl" className="text-start mb-1" weight="semibold" style={{ color: "#FFF" }}>Restante:</Text>
                                <Text size="lg" className="text-start" weight="medium" style={{ color: "#FFF" }}>
                                    {orden.TiempoRestante}
                                </Text>
                            </Card.Header>
                        </Col>
                    </Row>
                    <Card.Body style={{ height: "100px" }}>
                        <Row className="ms-4">
                            <Col xs={12}>
                                <div className="d-grid text-start mb-2">
                                    <Text size="md" className="text-start" weight="medium">Vehiculo:</Text>
                                    <Text muted size="md">{orden.marcaVehiculo + " " + orden.modeloVehiculo + " " + orden.annoVehiculo}</Text>
                                </div>
                                <div className="d-grid text-start">
                                    <Text size="md" className="text-start" weight="medium">Fecha de Ingreso:</Text>
                                    <Text muted size="md">{orden.fechaIngreso}</Text>
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className="d-grid text-start mb-2">
                                    <Text size="md" className="text-start" weight="medium">Encargado:</Text>
                                    <Text muted size="md">{orden.nombreMecanico}</Text>
                                </div>
                                <div className="d-grid text-start">
                                    <Text size="md" className="text-start" weight="medium">Cliente:</Text>
                                    <Text muted size="md">{orden.nombreCliente}</Text>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
        ))
    );
};
export default Orden;
