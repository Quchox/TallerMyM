import React, { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Row, Col } from "rsuite";
import Swal from "sweetalert2";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Image } from "rsuite";

import "../styles/inv.css";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const Detalles = () => {
  const navigate = useNavigate(); // Hook para navegar
  const { idProducto } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const { data } = await axios.get(
         `${BASE_URL}/productos/${idProducto}`
        ); //consumir api en backend por id
        setProducto(data);
        //console.log(data); // imprimir JSON en consola
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto(); // llamar funcion
  }, [idProducto]);

  if (!producto) return <p>Cargando...</p>;

  const normalizarVehiculosCompatibles = (vehiculos) => {
    if (Array.isArray(vehiculos)) {
      //si es array (mas de un elemento)
      return vehiculos.replace(/[\[\]"]/g, "").replace(/,/g, ", "); //expresion regular para convertir a string
    } else {
      try {
        //si es string (un solo elemento)
        return vehiculos.replace(/[\[\]"]/g, "").replace(/,/g, ", "); //expresion regular para convertir a string
      } catch (error) {
        return []; // Si falla, un array vacío
      }
    }
    //Se usa expresion regular en lugar de parseos porque cuando el array tiene un solo elemento es string normal pero cuando
    //tiene mas de uno es un array, es decir que el tipo cambia dependiendo si es uno o mas elementos en el array, y esto da problemas al parsear.
  };

  //toma el valor del array y usa la funcion para pasar a string legible.
  const vehiculos = normalizarVehiculosCompatibles(
    producto.vehiculosCompatibles
  );

  //Eliminar
  const Eliminar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Este producto o servicio será eliminado permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${BASE_URL}/productos/eliminar-producto/${idProducto}`
          )
          .then(() => {
            // Redirigir a la pagina de inventario despues de eliminar
            navigate("/inventario");
          })
          .catch((error) => {
            // error
            Swal.fire({
              title: "Error",
              text: "Error al eliminar producto o servicio",
              icon: "error",
              showCancelButton: false,
            });
            console.error("Error al eliminar producto:", error);
          });
      }
    });
  };

  //url get imagen
  const getImg = (img) => img ? `${BASE_URL}/img/${img}` : "/noResult.png";

  return (
    <div className="container main mx-auto p-5">
      <Grid fluid>
        <Row className="show-grid" gutter={16}>
          <Col xs={6}>
          <Image
            src={getImg(producto.img)}
            fallbackSrc="https://placehold.co/300x200"
            alt="nonexistent-image"
            width={300}
          />
          </Col>
          
          <Col
            xs={16}
            className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3"
          >
            <Row className="show-grid" gutter={16}>
              <Col xs={12} className="column">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.nombre}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="marca" className="form-label">
                    Marca:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.marca}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="vehiculos" className="form-label">
                    Vehículos compatibles:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={vehiculos}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="categoria" className="form-label">
                    Categoría:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.categoria}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="proveedor" className="form-label">
                    Proveedor:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.proveedor}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="serviceProduct" className="form-label">
                    Tipo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.tipo}
                    readOnly
                  />
                </div>
              </Col>
              <Col xs={12} className="column">
                <div className="mb-3">
                  <label htmlFor="precio" className="form-label">
                    Precio:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">₡</span>
                    <input
                      type="number"
                      className="form-control"
                      value={producto.precio}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="fechaIngreso" className="form-label">
                    Fecha de ingreso:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={new Date(producto.fechaIngreso).toLocaleDateString(
                      "es-CR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ubicacion" className="form-label">
                    Ubicación en almacén:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={producto.ubicacionAlmacen}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={producto.stock}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descuento
                  </label>
                  <input
                    type="text"
                    name="porcentajeDescuento"
                    className="form-control"
                    value={(producto.porcentajeDescuento)+"%"}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción:
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    className="form-control"
                    value={producto.descripcion}
                    readOnly
                    rows={6}
                  />
                </div>
              </Col>
            </Row>
            <div className="d-flex d-grid justify-content-end gap-4">
              <button
                onClick={Eliminar}
                className="btn btn-danger text-white"
                style={{ maxWidth: "120px" }}
              >
                Eliminar
              </button>
              <Link
                to={`/inventario-editar/${idProducto}`}
                className="btn btn-warning text-white"
                style={{ maxWidth: "120px" }}
              >
                Editar
              </Link>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Detalles;
