import React, { useState } from "react";
import SelectCategoria from "../components/SelectCategoria";
import SelectMarca from "../components/SelectMarca";
import SelectProveedor from "../components/SelectProveedor";
import SubirImagen from "../components/SubirImagen";
import SelectVehiculos from "../components/SelectVehiculos";
import { Grid, Row, Col } from "rsuite";
import "../styles/inv.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const Agregar = () => {
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    precio: parseFloat(0) || '',
    stock: parseInt(0) || '',
    fechaIngreso: "",
    ubicacionAlmacen: "",
    proveedor: "",
    categoria: "",
    vehiculosCompatibles: [],
    img: "",
    tipo: "",
    stockMinimo: parseInt(0) || ''
  });

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "precio" || name === "stock"
          ? Number(value)
          : name === "vehiculosCompatibles"
          ? JSON.stringify(value)
          : value,
    });
  };

  // --- Verificaciones de campos ---
  const verificarNombre = () => {
    var pass = false;
    //Campo Nombre
    if (!formData.nombre.trim()) {
      nombre.classList.remove("is-valid");
      nombre.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de nombre vacío");
    } else if (formData.nombre.trim()) {
      nombre.classList.remove("is-invalid");
      nombre.classList.add("is-valid");
      pass = true;
    }

    return pass;
  };

  const verificarMarca = () => {
    var pass = false;
    //Campo Marca
    if (!formData.marca.trim()) {
      marca.classList.remove("is-valid");
      marca.classList.add("is-invalid");
      pass = false;
      errorNotification("Seleccione una marca");
    } else if (formData.marca.trim()) {
      marca.classList.remove("is-invalid");
      marca.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarPrecio = () => {
    var pass = false;
    //Campo Precio
    if (!formData.precio) {
      precio.classList.remove("is-valid");
      precio.classList.add("is-invalid");
      pass = false;
      errorNotification("Digite el precio");
    } else if (formData.precio) {
      precio.classList.remove("is-invalid");
      precio.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarFechaIngreso = () => {
    var pass = false;
    //Campo Fecha Ingreso
    if (!formData.fechaIngreso.trim()) {
      fechaIngreso.classList.remove("is-valid");
      fechaIngreso.classList.add("is-invalid");
      pass = false;
      errorNotification("Digite la fecha de ingreso");
    } else if (formData.marca.trim()) {
      fechaIngreso.classList.remove("is-invalid");
      fechaIngreso.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarVehiculosCompatibles = () => {
    var pass = false;
    //Campo Fecha Vehiculos compatibles
    if (formData.vehiculosCompatibles.length == 0) {
      pass = false;
      errorNotification("Seleccione al menos un vehiculo compatible");
    } else if (formData.vehiculosCompatibles.length > 0) {
      pass = true;
    }
    return pass;
  };

  const verificarUbicacion = () => {
    var pass = false;
    //Campo Ubicacion en almacen
    if (!formData.ubicacionAlmacen.trim()) {
      ubicacionAlmacen.classList.remove("is-valid");
      ubicacionAlmacen.classList.add("is-invalid");
      pass = false;
      errorNotification("Escriba la ubicación en almacén");
    } else if (formData.ubicacionAlmacen.trim()) {
      ubicacionAlmacen.classList.remove("is-invalid");
      ubicacionAlmacen.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarCategoria = () => {
    var pass = false;
    //Campo Categoria
    if (!formData.categoria.trim()) {
      categoria.classList.remove("is-valid");
      categoria.classList.add("is-invalid");
      pass = false;
      errorNotification("Seleccione una categoria");
    } else if (formData.categoria.trim()) {
      categoria.classList.remove("is-invalid");
      categoria.classList.add("is-valid");
      pass = true;
    }

    return pass;
  };

  const verificarStock = () => {
    var pass = false;
    //Campo Stock
    if (!formData.stock) {
      stock.classList.remove("is-valid");
      stock.classList.add("is-invalid");
      pass = false;
      errorNotification("Digite el stock");
    } else if (formData.stock) {
      stock.classList.remove("is-invalid");
      stock.classList.add("is-valid");
      pass = true;
    }

    return pass;
  };

  const verificarProveedor = () => {
    var pass = false;
    //Campo Proveedor
    if (!formData.proveedor.trim()) {
      proveedor.classList.remove("is-valid");
      proveedor.classList.add("is-invalid");
      pass = false;
      errorNotification("Seleccione el proveedor");
    } else if (formData.proveedor.trim()) {
      proveedor.classList.remove("is-invalid");
      proveedor.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarDescripcion = () => {
    var pass = false;
    //Campo Descripcion
    if (!formData.descripcion.trim()) {
      descripcion.classList.remove("is-valid");
      descripcion.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de descripcion vacío");
    } else if (formData.descripcion.trim()) {
      descripcion.classList.remove("is-invalid");
      descripcion.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarTipo = () => {
    var pass = false;
    //Campo Descripcion
    if (!formData.tipo.trim()) {
      tipo.classList.remove("is-valid");
      tipo.classList.add("is-invalid");
      pass = false;
      errorNotification("Debe seleccionar el tipo");
    } else if (formData.tipo.trim()) {
      tipo.classList.remove("is-invalid");
      tipo.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  // VERIFICACION GENERAL
  const verificacion = () => {
    var pass = false;
    //Verificar que todos los campos sean validos
    if (
      verificarNombre() &&
      verificarPrecio() &&
      verificarMarca() &&
      verificarFechaIngreso() &&
      verificarVehiculosCompatibles() &&
      verificarUbicacion() &&
      verificarCategoria() &&
      verificarStock() &&
      verificarProveedor() &&
      verificarDescripcion() &&
      verificarTipo()
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);

    if (verificacion()) {
      axios
        .post(`${BASE_URL}/productos/agregar-producto/`, formData)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Producto agregado correctamente",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            navigate("/inventario");
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error al agregar un producto / servicio:",
            text: error,
            showConfirmButton: false,
            timer: 1000,
          })
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col xs={6}>
              <SubirImagen
                value={formData.img}
                onChange={(newPath) =>
                  setFormData((prev) => ({ ...prev, img: newPath }))
                }
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
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="form-control"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="marca" className="form-label">
                      Marca:
                    </label>
                    <SelectMarca
                      value={formData.marca}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="vehiculos" className="form-label">
                      Vehículos compatibles:
                    </label>
                    <SelectVehiculos
                      value={formData.vehiculosCompatibles}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">
                      Categoría:
                    </label>
                    <SelectCategoria
                      value={formData.categoria}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="proveedor" className="form-label">
                      Proveedor:
                    </label>
                    <SelectProveedor
                      value={formData.proveedor}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="serviceProduct" className="form-label">
                      Servicio o Producto
                    </label>
                    <select
                      id="tipo"
                      name="tipo"
                      className="form-select"
                      value={formData.tipo}
                      onChange={handleChange}
                    >
                      <option value="">Seleccione el tipo</option>
                      <option value="producto">Producto</option>
                      <option value="servicio">Servicio</option>
                    </select>
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
                        id="precio"
                        name="precio"
                        type="number"
                        min={0}
                        step={0.01}
                        className="form-control"
                        value={Number(formData.precio)}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="fechaIngreso" className="form-label">
                      Fecha de ingreso:
                    </label>
                    <input
                      id="fechaIngreso"
                      name="fechaIngreso"
                      type="date"
                      className="form-control"
                      value={formData.fechaIngreso}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">
                      Ubicación en almacén:
                    </label>
                    <input
                      id="ubicacionAlmacen"
                      name="ubicacionAlmacen"
                      type="text"
                      className="form-control"
                      value={formData.ubicacion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stock" className="form-label">
                      Stock:
                    </label>
                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      min={0}
                      className="form-control"
                      value={formData.stock}
                      onChange={handleChange}
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
                      value={formData.descripcion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="stockMinimo" className="form-label">
                      Stock Minimo:
                    </label>
                    <input
                      type="number"
                      name="stockMinimo"
                      className="form-control"
                      value={(formData.stockMinimo)}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
              </Row>
              <div className="d-grid justify-content-end me-5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ maxWidth: "120px" }}
                >
                  Agregar
                </button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default Agregar;
