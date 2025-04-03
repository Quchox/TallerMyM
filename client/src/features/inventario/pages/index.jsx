import React, { useState, useEffect } from "react";
import ContenedorProductos from "../components/contenedorArticulo";
import SelectCategoria from "../components/SelectCategoria";
import SelectMarca from "../components/SelectMarca";
import RangoPrecio from "../components/RangoPrecio";
import ModalSolicitarProducto from "../components/ModalSolicitarProducto";
import {
  BrowserRouter as Router,
  Link,
  useNavigate
} from "react-router-dom";
import axios from "axios";
import { Button, Grid, Row, Col, FlexboxGrid, Divider } from "rsuite";
import Notificaciones from "../../../components/Notificaciones";
import "../styles/inv.css";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const IndexInventario = () => {
  const [precios, setPrecios] = useState([]);
  //console.log(precios)
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    categoria: "",
    stock: 0,
    rangoPrecio: [precios.precioMin, precios.precioMax],
  });
  //console.log(formData)
  const navigate = useNavigate(); // Hook para navegar

  useEffect(() => {
    async function obtenerPrecios() {
      try {
        const response = await axios.get(
          `${BASE_URL}/productos/precios`
        );
        setPrecios(response.data);
        if (response.data) {
          // Actualiza formData solo después de obtener los precios
          setFormData((prevState) => ({
            ...prevState,
            rangoPrecio: [response.data.precioMin, response.data.precioMax],
          }));
        }
      } catch (error) {
        console.error("Error obteniendo precios:", error);
      }
    }

    obtenerPrecios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "precio" || name === "stock"
          ? Number(value)
          : name === "vehiculosCompatibles"
          ? value
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
  };

  return (
    <div className="grid-container">
      <Notificaciones modulo={'INVENTARIO'}/>
      <nav
        className="sidebar p-4 rounded-3 shadow-sm"
        style={{ maxWidth: "550px" }}
      >
        <form onSubmit={handleSubmit}>
          <br />
          <div className="row my-2 d-flex justify-content-center">
            <Grid fluid>
              <FlexboxGrid justify="center">
                <Row className="show-grid">
                  <Col xs={12}>
                    <span>Categoria:</span>
                    <SelectCategoria
                      value={formData.categoria}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col xs={12}>
                    <span>Marca:</span>
                    <SelectMarca
                      value={formData.marca}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </FlexboxGrid>
              <br />
              <FlexboxGrid justify="center">
                <Row className="show-grid">
                  <Col xs={12}>
                    <span>Stock:</span>
                    <select
                      className="form-control"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                    >
                      <option value="">Cualquiera</option>
                      <option value="10">Menos de 10</option>
                      <option value="50">Menos de 50</option>
                      <option value="100">Menos de 100</option>
                      <option value="500">Menos de 500</option>
                      <option value="1000">Menos de 1000</option>
                    </select>
                  </Col>
                  <Col xs={12}>
                    <div>
                      <span>Producto:</span>
                      <input
                        name="nombre"
                        className="form-control"
                        placeholder="Buscar por nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
              </FlexboxGrid>
            </Grid>
          </div>
          <br />
          <div className="row mb-4">
            <RangoPrecio
              value={[formData.precioMin, formData.precioMax]}
              onChange={handleChange}
            />
          </div>
          <div className="row mx-1">
            <Divider />
            <div>
              <Row gutter={10}>
                <Col xs={11}>
                  <Button
                    type="button"
                    className="btn btn-sm btn-secondary text-white"
                    style={{ minWidth: "50px", width: "130px" }}
                  >
                    <Link to="/inventario-agregar" className="btn-link">
                      Agregar producto
                    </Link>
                  </Button>
                </Col>
                <Col xs={2}>
                  <Divider vertical />
                </Col>
                <Col xs={11}>
                  <ModalSolicitarProducto />
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </nav>

      <div className="main rounded-3">
        <div className="article-container scrollable-container">
          <ContenedorProductos formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default IndexInventario;
