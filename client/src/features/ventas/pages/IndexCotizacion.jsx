import React, { useState, useEffect } from "react";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import axios from "axios";

import ListaCotizaciones from "../components/ListaCotizaciones";

const IndexCotizacion = () => {
    return (
        <div className="grid-container">
            <nav
                className="sidebar p-4 rounded-3 shadow-sm"
                style={{ maxWidth: "550px" }}
            >
                <form>
                    <br />
                    <div className="row my-2 d-flex justify-content-center">
                    </div>
                    <br />
                    <div className="row mx-1">
                        <div>
                            <Row gutter={10}>
                                <Col xs={11}>
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-secondary text-white"
                                        style={{ minWidth: "50px", width: "130px" }}>
                                        <Link to="/ventas" className="btn-link">Ventas</Link>
                                    </Button>
                                </Col>
                                <Col xs={2}>
                                    <Divider vertical />
                                </Col>
                                <Col xs={11}>
                                    <Button
                                        type="button"
                                        className="btn btn-sm btn-secondary text-white"
                                        style={{ minWidth: "50px", width: "135px" }}>
                                        <Link to="/cotizacion-cotizar" className="btn-link">Generar Cotización</Link>
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </form>
            </nav>
            <div className="main rounded-3">
                <div className="article-scroll">
                    <ListaCotizaciones />
                </div>
            </div>
        </div>
    );
};
export default IndexCotizacion;
