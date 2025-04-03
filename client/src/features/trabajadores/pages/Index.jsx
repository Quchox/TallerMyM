import React, { useState, useEffect } from "react";
import ListaTrabajadores from "../components/ListaTrabajadores";
import axios from "axios";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import { Link, useNavigate } from "react-router-dom";
import "../styles/gtr.css";

export const BASE_URL = import.meta.env.VITE_API_URL;

const IndexTrabajadores = () => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("salario") ? Number(value) : value,
    });
  };

  const [trigger, setTrigger] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setTrigger(prev => !prev);
  };

  return (
    <div className="grid-container">
      <nav className="sidebar p-4 rounded-3 shadow-sm" style={{ maxWidth: "550px" }}>

        <div className="row mx-1">
          <Row gutter={10}>
            <Col xs={11}>
              <Button className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "140px" }}>
                <Link to="/trabajadores-agregar" className="btn-link">Agregar Trabajador</Link>
              </Button>
            </Col>
            <Col xs={2}>
              <Divider vertical />
            </Col>
            <Col xs={11}>
              <Link
                to="/trabajadores-vacaciones"
                type="submit"
                className="btn btn-sm btn-secondary text-white" style={{ minWidth: "50px", width: "130px" }}>
              Filtrar</Link>
            </Col>
          </Row>
        </div>
      </nav>
      <div className="main rounded-3">
        <div className="article-scroll">
          <ListaTrabajadores />
        </div>
      </div>
    </div>
  );
};

export default IndexTrabajadores;
