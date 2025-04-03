import React from "react";
import {
  BrowserRouter as Router,
  Link,
  useNavigate,
} from "react-router-dom";
import { Grid, Row, Col, Text } from "rsuite";
import "../styles/flu.css";
import ColPendiente from "../components/ColPendiente";
import ColProgreso from "../components/ColProgreso";
import ColListo from "../components/ColListo";
import Notificaciones from "../../../components/Notificaciones";

const IndexFlujo = () => {
  const navigate = useNavigate(); // Hook para navegar

  return (
    <div className="grid-container">
      {/* OPCIONES */}
      <Notificaciones modulo={'FLUJO'}/>
      <nav
        className="sidebar p-4 rounded-3 shadow-sm p-2"
        style={{ maxWidth: "550px" }}
      >
        <Link to="/flujo-agregar" 
        className="btn btn-secondary btn-sm text-white">Agregar orden</Link>
      </nav>

      {/* FLUJO */}
      <div className="main rounded-3">
        <div className="">
          <Grid fluid>
            <Row className="d-flex gap-3">
              {/* COLUMNA EN PROCESO */}
              <Col xs={8} className="flujo-col ">
                <div className="bg-primary rounded-top-4 py-2 mb-4">
                  <Text size="xxl" className="text-white pt-2">Pendiente</Text>
                </div>
                <div className="px-4 scrollable-container">
                  <ColPendiente />
                </div>
              </Col>
              {/* COLUMNA EN PROCESO */}

              <Col xs={8} className="flujo-col ">
              <div className="bg-primary rounded-top-4 py-2 mb-4">
                  <Text size="xxl" className="text-white pt-2">En progreso</Text>
                </div>
                <div className="px-4 scrollable-container">
                  <ColProgreso />
                </div>
              </Col>
              <Col xs={8} className="flujo-col ">
              <div className="bg-primary rounded-top-4 py-2 mb-4">
                  <Text size="xxl" className="text-white pt-2">Listo</Text>
                </div>
                <div className="px-4 scrollable-container">
                  <ColListo />
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default IndexFlujo;
