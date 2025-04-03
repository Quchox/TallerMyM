import "../styles/ven.css";
import React, { useState, useEffect } from "react";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import ListadoVentas from "../components/ListadoVentas";
import ListadoOrdenes from "../components/ListadoOrdenes";
import Notificaciones from "../../../components/Notificaciones";

const Index = () => {
  const [vista, setVista] = useState("ListadoVentas");//estado para manejar listado

  return (
    <Grid className="container mt-3 rounded-0">
      <Notificaciones modulo={'VENTAS'}/>
      <Row>
        <Col xs={2}>
          <Link className="nav-btn btn text-white rounded-0" to="/cotizacion" style={{height: "44px", textAlign: "center", paddingTop:"10px"}}>Cotizar</Link>
        </Col>
        <Col xs={22}>
          <nav>
            <div className="d-flex flex-row btn-container">
              <button className="nav-btn text-white" onClick={() => setVista("ListadoVentas")}>Ver Listado de Ventas</button>
              <button className="nav-btn text-white" onClick={() => setVista("ListadoOrdenes")}>Ver Listado de Ordenes</button>
            </div>
          </nav>
        </Col>
        <Col xs={2}></Col>
        <Col xs={22}>
          <div className="nav-container">
            {vista === "ListadoVentas" ? <ListadoVentas /> : <ListadoOrdenes />}
          </div>
        </Col>
      </Row>
    </Grid>
  );
};
export default Index;
