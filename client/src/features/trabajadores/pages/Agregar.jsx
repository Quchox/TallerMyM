import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Grid, Row, Col } from "rsuite";
import "../styles/gtr.css";
import { useNavigate } from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const AgregarTrabajador = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    cedula: "",
    salario: 0,
    seguroSocial: "",
  });

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "salario" ? Number(value) : value,
    });
  };

  const verificarNombreCompleto = () => {
    var pass = false;
    if (!formData.nombreCompleto.trim()) {
      nombreCompleto.classList.remove("is-valid");
      nombreCompleto.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de nombre vacío");
    } else {
      nombreCompleto.classList.remove("is-invalid");
      nombreCompleto.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarCedula = () => {
    var pass = false;
    const cedulaPattern = /^[0-9]{9}$/;
    if (!formData.cedula.trim() || !cedulaPattern.test(formData.cedula)) {
      cedula.classList.remove("is-valid");
      cedula.classList.add("is-invalid");
      pass = false;
      errorNotification("Cédula inválida o vacía");
    } else {
      cedula.classList.remove("is-invalid");
      cedula.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarSalario = () => {
    var pass = false;
    if (!formData.salario || formData.salario <= 0) {
      salario.classList.remove("is-valid");
      salario.classList.add("is-invalid");
      pass = false;
      errorNotification("Digite un salario válido");
    } else {
      salario.classList.remove("is-invalid");
      salario.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarSeguroSocial = () => {
    var pass = false;
    if (!formData.seguroSocial.trim()) {
      seguroSocial.classList.remove("is-valid");
      seguroSocial.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de seguro social vacío");
    } else {
      seguroSocial.classList.remove("is-invalid");
      seguroSocial.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificacion = () => {
    var pass = false;
    if (
      verificarNombreCompleto() &&
      verificarCedula() &&
      verificarSalario() &&
      verificarSeguroSocial()
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
      axios
        .post(`${BASE_URL}/trabajadores/agregar-trabajador/`, formData)
        .then((res) => {
          // Solo entramos al bloque then si el código es exitoso
          switch (res.status) {
            case 201:
              Swal.fire({
                icon: "success",
                title: "Trabajador agregado correctamente",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                navigate("/trabajadores");
              });
              break;

            default:
              Swal.fire({
                title: "Error",
                text: "Ocurrió un problema inesperado.",
                icon: "error",
              });
              break;
          }
        })
        .catch((error) => {
          // Cuando la respuesta es un error
          if (error.response) {
            const status = error.response.status;

            // error cedula repetida
            switch (status) {
              case 409:
                Swal.fire({
                  icon: "warning",
                  title: "Esta cédula ya está registrada",
                  showConfirmButton: true,
                });
                break;

              // Error servidor
              case 500:
                Swal.fire({
                  title: "Error del servidor",
                  text: "Ocurrió un error en el servidor.",
                  icon: "error",
                });
                break;

              // Otro error
              default:
                Swal.fire({
                  title: "Error",
                  text: error.response.data.error || "Ocurrió un problema inesperado.",
                  icon: "error",
                });
                break;
            }
          } else {
            // Si no hay error de respuesta
            Swal.fire({
              icon: "error",
              title: "Error de conexión",
              text: "No se pudo conectar al servidor.",
              showConfirmButton: true,
            });
          }
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container main mx-auto p-5">
        <Grid fluid>
          <Row className="show-grid" gutter={16}>
            <Col xs={16} className="d-grid gap-5 bg-white shadow-sm p-5 rounded-3">
              <Row className="show-grid" gutter={16}>
                <Col xs={12} className="column">
                  <div className="mb-3">
                    <label htmlFor="nombreCompleto" className="form-label">
                      Nombre Completo:
                    </label>
                    <input
                      id="nombreCompleto"
                      name="nombreCompleto"
                      type="text"
                      className="form-control"
                      value={formData.nombreCompleto}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cedula" className="form-label">
                      Cédula:
                    </label>
                    <input
                      id="cedula"
                      name="cedula"
                      type="text"
                      className="form-control"
                      value={formData.cedula}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="salario" className="form-label">
                      Salario:
                    </label>
                    <input
                      id="salario"
                      name="salario"
                      type="number"
                      step={0.01}
                      min={0}
                      className="form-control"
                      value={formData.salario}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="seguroSocial" className="form-label">
                      Seguro Social:
                    </label>
                    <input
                      id="seguroSocial"
                      name="seguroSocial"
                      type="text"
                      className="form-control"
                      value={formData.seguroSocial}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Agregar Trabajador
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    </form>
  );
};

export default AgregarTrabajador;
