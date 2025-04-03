import React, { useState, useEffect } from "react";
import { Grid, Row, Col } from "rsuite";
import "../styles/flu.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import SelectTrabajadores from "../components/SelectTrabajadores";
import SelectVehiculos from "../components/SelectVehiculos";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const Editar = () => {
  const { idOrden } = useParams();
  const navigate = useNavigate(); // Hook para navegar
  const [formData, setFormData] = useState({
    idOrden: 0,
    tiempoEstimado: "",
    idTrabajador: null,
    idVehiculo:null,
    idCliente:null,
    descripcion: "",
    estadoAtrasado: 0,

  });
  const [fase, setFase] = useState({
    idOrden: 0,
    estadoOrden: 0
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
  const verificarDescripcion = () => {
    var pass = false;
    //Campo Marca
    if (formData.descripcion.trim().length < 5) {
      pass = false;
      errorNotification("Debe redactar una descripcion");
    } else if (formData.descripcion.trim().length > 5) {
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
      verificarDescripcion()
    ) {
      pass = true;
    } else {
      pass = false;
    }
    return pass;
  };

// Función para convertir el formato de fecha de "dd-MM-yyyy" a "yyyy-MM-dd"
const convertDateFormat = (dateString) => {
  if (!dateString) return '';
  // Separar por '/' o '-' usando una expresión regular
  const parts = dateString.split(/[-/]/);
  // Validar que tenga 3 partes (día, mes, año)
  if (parts.length !== 3) return '';
  const [day, month, year] = parts;
  // Validar que día, mes y año sean números
  if (isNaN(day) || isNaN(month) || isNaN(year)) return '';
  // Formatear como yyyy-MM-dd
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

useEffect(() => {
  const obtenerOrden = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/flujo/obtener-orden/${idOrden}`); //consumir api en backend por id

      setFormData((prev) => ({
        ...prev,//Mantener valores predefinidos
        idOrden: data.idOrden,
        tiempoEstimado: convertDateFormat(data.tiempoEstimado),
        idTrabajador: data.idTrabajador,
        idVehiculo: data.idVehiculo,
        idCliente: data.idCliente,
        descripcion: data.descripcion,
        estadoAtrasado: data.estadoAtrasado
      }));

      setFase((prev) => ({
        ...prev,//Mantener valores predefinidos
        idOrden: data.idOrden,
        estadoOrden: -1// -1 porque el controller suma +1 (porque originalmente esta hecho por cambiar fase siguiente)
      }));
    } catch (error) {
      //console.error("Error al obtener el orden:", error);
    }
  };
  obtenerOrden(); // llamar funcion
}, [idOrden]);//cargar al tener id

const actualizarOrden = async () => {
  try {
    if (verificacion()) {

      const result = await Swal.fire({
        text: `¿ Actualizar cambios realizados?`,
        icon: "warning",
        confirmButtonText: 'Confirmar',
        showConfirmButton: true,
        showCancelButton: true,
        customClass: {
          actions: 'my-actions',
          confirmButton: 'btn btn-warning btn-sm text-white order-2',
          cancelButton: 'btn btn-sm btn-outline-dark order-1',
        },
      });

      if (result.isConfirmed) {
        const resFase = await axios.put(`${BASE_URL}/flujo/actualizar-orden/`, formData); // Consumir API
        console.log(resFase)

        if (resFase.status === 200) {
          Swal.fire({
            title: 'Orden actualizada!',
            icon: 'success',
            showConfirmButton: false
          });
          navigate(`/flujo-detalles/${idOrden}`);
        }
      }
    }
  } catch (error) {
    Swal.fire({
      title: 'Error al actualizar orden!',
      icon: 'error',
      showConfirmButton: false
    });
    console.error("Error al actualizar fase:", error);
  }

};

const cancelarOrden = async () => {
  try {
    const result = await Swal.fire({
      text: `¿¡ Seguro que desea cancelar la orden !?`,
      icon: "error",
      confirmButtonText: 'Confirmar',
      showConfirmButton: true,
      showCancelButton: true,
      customClass: {
        actions: 'my-actions',
        confirmButton: 'btn btn-warning btn-sm text-white order-2',
        cancelButton: 'btn btn-sm btn-outline-dark order-1',
      },
    });

    if (result.isConfirmed) {
      const resFase = await axios.put(`${BASE_URL}/flujo/actualizar-fase-orden/`, fase); // Consumir API
      console.log(resFase)

      if (resFase.status === 200) {
        Swal.fire({
          title: 'Orden cancelada!',
          icon: 'success',
          showConfirmButton: false
        });
        navigate("/flujo");
      }
    }
  } catch (error) {
    Swal.fire({
      title: 'Error al actualizar orden!',
      icon: 'error',
      showConfirmButton: false
    });
    console.error("Error al actualizar fase:", error);
  }
};

return (
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
          <Row gutter={16}>
            <Col xs={12} className="column">
              <span>
                Seleccionar un mecánico
                <SelectTrabajadores
                  value={formData.idTrabajador}
                  onChange={(e) => setFormData(prev => ({ ...prev, idTrabajador: e.target.value }))}
                />
              </span>
              <span>
                Vehiculo:
                <SelectVehiculos 
                idCliente={formData.idCliente}
                value={formData.idVehiculo}
                onChange={(e) => setFormData(prev => ({ ...prev, idVehiculo: e.target.value }))}
                />
              </span>
            </Col>
            <Col xs={12} className="column">
              <span>
                Estimado de finalización:
                <input
                  type="date"
                  className="form-control"
                  style={{ maxWidth: "370px" }}
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
              rows={6}
              name="descripcion"
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
            />
          </span></Row>
          <div className="row mt-4">
            <div className="d-flex col justify-content-start">
              <Link
                to={`/flujo-detalles/${idOrden}`}
                type="button"
                className="btn btn-outline-dark btn-sm"
                style={{ maxWidth: "120px" }}
              >
                Volver Atrás
              </Link>
            </div>
            <div className="d-flex col justify-content-end">
              <button
                onClick={cancelarOrden}
                type="button"
                className="btn btn-danger btn-sm text-white me-3"
                style={{ maxWidth: "120px" }}
              >
                Cancelar Orden
              </button>
              <button
                onClick={actualizarOrden}
                type="button"
                className="btn btn-sm btn-secondary text-white"
                style={{ maxWidth: "120px" }}
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Grid>
  </div>
);
};

export default Editar;
