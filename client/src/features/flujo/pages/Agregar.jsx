import React, { useState } from "react";
import { Grid, Row, Col, Text } from "rsuite";
import "../styles/flu.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SelectClientes from "../components/SelectClientes";
import SelectTrabajadores from "../components/SelectTrabajadores";
import SelectVehiculos from "../components/SelectVehiculos";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Agregar = () => {
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    tiempoEstimado: "",
    idTrabajador: null,
    idCliente: null,
    idVehiculo: null,
    descripcion: ""
  });

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
    });
  };
  // --- Verificaciones de campos ---
  const VerificarTiempoEstimado = () => {
    if (!formData.tiempoEstimado) {
      errorNotification("Campo de tiempo estimado vacío");
      return false;
    }
    return true;
  };
  const verificarTrabajador = () => {
    var pass = false;
    //Campo Marca
    if (!formData.idTrabajador) {
      pass = false;
      errorNotification("Debe asignar un mecanico encargado");
    } else if (formData.idTrabajador) {
      pass = true;
    }
    return pass;
  };
  const verificarCliente = () => {
    var pass = false;
    //Campo Precio
    if (!formData.idCliente) {
      pass = false;
      errorNotification("Debe asignar un cliente");
    } else if (formData.idCliente) {
      pass = true;
    }
    return pass;
  };
  const verificarVehiculo = () => {
    var pass = false;
    //Campo Fecha Ingreso
    if (!formData.idVehiculo) {
      pass = false;
      errorNotification("Debe asignar un vehiculo");
    } else if (formData.idVehiculo) {
      pass = true;
    }
    return pass;
  };
  const verificarDescripcion = () => {
    var pass = false;
    //Campo Fecha Ingreso
    if (!formData.descripcion) {
      pass = false;
      errorNotification("Debe Redactar una descripcion");
    } else if (formData.descripcion) {
      pass = true;
    }
    return pass;
  };
  // VERIFICACION GENERAL
  const verificacion = () => {
    var pass = false;
    //Verificar que todos los campos sean validos
    if (
      VerificarTiempoEstimado() &&
      verificarTrabajador() &&
      verificarCliente() &&
      verificarVehiculo() &&
      verificarDescripcion()
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificacion()) {
      try {
        const res = await axios.post(`${BASE_URL}/flujo/agregar-orden/`, formData);
        //console.log(res.data);

        if (res.status === 201) {
          await Swal.fire({
            icon: "success",
            title: "Orden agregada correctamente",
            showConfirmButton: false,
            timer: 1300,
          });
          navigate("/flujo");
        } else {
          Swal.fire({
            icon: "warning",
            title: "Ocurrió un problema al procesar la solicitud",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error al agregar la orden:", error);
        if (error.response) {
          const { status } = error.response;
          let message = "Error al agregar la orden";
          if (status === 400) {
            message = "Solicitud incorrecta, por favor verifique los datos ingresados";
          } else if (status === 404) {
            message = "No se encontró el recurso solicitado";
          } else if (status === 500) {
            message = "Error interno del servidor, por favor intente más tarde";
          }
          Swal.fire({
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error desconocido, por favor intente más tarde",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="container main p-5">
        <Grid fluid>
          <Row
            className="show-grid d-flex justify-content-center align-items-center"
            gutter={16}
          >
            <Col
              xs={16}
              className="d-grid gap-3 bg-white shadow-sm p-5 rounded-3"
            >
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <span>
                    Seleccionar un cliente
                    <SelectClientes
                      value={formData.idCliente}
                      onChange={(e) => setFormData(prev => ({ ...prev, idCliente: e.target.value }))}
                    />
                  </span>
                  <span>
                    Seleccionar un mecánico
                    <SelectTrabajadores
                      value={formData.idTrabajador}
                      onChange={(e) => setFormData(prev => ({ ...prev, idTrabajador: e.target.value }))}
                    />
                  </span>

                </Col>
                <Col xs={12} className="column">
                  <span>
                    Seleccionar un vehiculo
                    <SelectVehiculos
                      idCliente={formData.idCliente}
                      value={formData.idVehiculo}
                      onChange={(e) => setFormData(prev => ({ ...prev, idVehiculo: e.target.value }))}
                    />
                  </span>
                  <span>
                    Estimado de finalización:
                    <input
                      type="date"
                      className="form-control"
                      style={{ maxWidth: "355px" }}
                      name="tiempoEstimado"
                      value={formData.tiempoEstimado}
                      onChange={(e) => setFormData(prev => ({ ...prev, tiempoEstimado: e.target.value }))}
                    />
                  </span>
                </Col>
              </Row>
              <Row><span>
                Descripción:
                <textarea
                  className="form-control"
                  rows={4}
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                />
              </span></Row>
              <div className="d-grid justify-content-end me-5 mt-2">
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
