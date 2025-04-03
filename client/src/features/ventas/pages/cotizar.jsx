import { Button, Grid, Row, Col } from "rsuite";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  data,
} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import SelectClientes from "../../clientes/components/SelectClientes";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const Cotizar = () => {
  const [formData, setFormData] = useState({
    montoTotal: 0,
    montoManoObra: 0,
    tiempoEstimado: "",
    detalles: "",
    idCliente: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
    });
  };

  //Verificaciones de campos
  const verificarMontoTotal = () => {
    var pass = false;
    if (!formData.montoTotal) {
      montoTotal.classList.remove("is-valid");
      montoTotal.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de monto total vacío");
    } else if (formData.montoTotal) {
      montoTotal.classList.remove("is-invalid");
      montoTotal.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarMontoManoObra = () => {
    var pass = false;
    if (!formData.montoManoObra) {
      montoManoObra.classList.remove("is-valid");
      montoManoObra.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de monto por mano de obra vacío");
    } else if (formData.montoManoObra) {
      montoManoObra.classList.remove("is-invalid");
      montoManoObra.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarDetalles = () => {
    var pass = false;
    if (!formData.detalles.trim()) {
      detalles.classList.remove("is-valid");
      detalles.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de detalles vacío");
    } else if (formData.detalles.trim()) {
      detalles.classList.remove("is-invalid");
      detalles.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarTiempoEstimado = () => {
    var pass = false;
    if (!formData.tiempoEstimado.trim()) {
      tiempoEstimado.classList.remove("is-valid");
      tiempoEstimado.classList.add("is-invalid");
      pass = false;
      errorNotification("Campo de tiempo estimado vacío");
    } else if (formData.tiempoEstimado.trim()) {
      tiempoEstimado.classList.remove("is-invalid");
      tiempoEstimado.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarCliente = () => {
    var pass = false;
    if (!formData.idCliente) {
      idCliente.classList.remove("is-valid");
      idCliente.classList.add("is-invalid");
      pass = false;
      errorNotification("Debe seleccionar un cliente");
    } else if (formData.idCliente) {
      idCliente.classList.remove("is-invalid");
      idCliente.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  // VERIFICACION GENERAL
  const verificacion = () => {
    var pass = false;
    //Verificar que todos los campos sean validos
    if (
      verificarMontoTotal() &&
      verificarMontoManoObra() &&
      verificarTiempoEstimado() &&
      verificarDetalles() &&
      verificarCliente
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (verificacion()) {
      //console.log(formData);

      axios
        .post(`${BASE_URL}/cotizacion/agregar-cotizacion/`, formData)
        .then((res) => {

          console.log(res);

          Swal.fire({
            icon: "success",
            title: "Cotizacion generada correctamente",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            navigate(`/ventas`)
          });

        }).finally(
          navigate(`/ventas`)
        );
    }

  }
  return (
    <div className="container bg-white mt-5 p-5">
      <Grid>

        <form onSubmit={handleSubmit}>
          <Row className="show-grid" gutter={16}>
            <Col xs={12} className="column">
              <label><label>Monto Total:</label>
                <input value={formData.montoTotal} onChange={handleChange} id="montoTotal" name="montoTotal" className="form-control " type="number" min="0" style={{ minWidth: "250px" }} />
              </label>

              <label><label>Monto por mano de obra:</label>
                <input value={formData.montoManoObra} onChange={handleChange} id="montoManoObra" name="montoManoObra" className="form-control" type="number" min="0" style={{ minWidth: "250px" }} />
              </label>
            </Col>

            <Col xs={12} className="column">
              <label><label>Tiempo estimado:</label>
                <input value={formData.tiempoEstimado} id="tiempoEstimado" onChange={handleChange} name="tiempoEstimado" className="form-control" style={{ minWidth: "250px" }} />
              </label>

              <label><label>Cliente:</label>
                <SelectClientes value={formData.idCliente} onChange={handleChange} />
              </label>
            </Col>

          </Row>
          <label><label>Detalles:</label>
            <textarea value={formData.detalles} onChange={handleChange} id="detalles" name="detalles" className="form-control " rows="4" cols="1200" style={{ minWidth: "250px" }} />
          </label>
          <div className="d-flex justify-content-center mt-5">
            <Button type="submit" className="btn btn-secondary text-white" style={{ minWidth: "50px", width: "155px" }}>Generar Cotización</Button>
          </div>

        </form>
      </Grid>
    </div >

  );
}
export default Cotizar;