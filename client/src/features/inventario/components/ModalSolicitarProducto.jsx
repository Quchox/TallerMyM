import React, { useState } from "react";
import { Modal, Button } from "rsuite";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ModalSolicitarProducto = () => {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const navigate = useNavigate();

  const errorNotification = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      showConfirmButton: false,
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Funciones de verificación similares al componente Agregar
  const verificarTitulo = () => {
    const input = document.getElementById("titulo");
    let pass = false;
    if (!titulo.trim()) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      errorNotification("El campo de título está vacío");
      pass = false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  const verificarCuerpo = () => {
    const input = document.getElementById("cuerpo");
    let pass = false;
    if (!cuerpo.trim()) {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      errorNotification("El campo de solicitud (descripción) está vacío");
      pass = false;
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      pass = true;
    }
    return pass;
  };

  // Verificación general: ambos campos deben ser válidos
  const verificacion = () => {
    return verificarTitulo() && verificarCuerpo();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!verificacion()) return;

    // Valor quemado para usuario
    const usuario = "usuarioMecanico";

    try {
      const response = await axios.post(
        `${BASE_URL}/inventario/agregar-solicitud`,
        { titulo, cuerpo, usuario }
      );
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Solicitud enviada correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar la solicitud",
        text: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }finally{
      // Reiniciar campos y cerrar modal
      setTitulo("");
      setCuerpo("");
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        style={{ minWidth: "80px", maxWidth: "350px" }}
        className="btn btn-primary btn-sm text-white"
        onClick={handleOpen}
      >
        Solicitar Producto
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Solicitar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">
          <span>Título:</span>
          <input
            id="titulo"
            name="titulo"
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <br />
          <span>Solicitud:</span>
          <textarea
            id="cuerpo"
            name="cuerpo"
            className="form-control"
            rows={6}
            value={cuerpo}
            onChange={(e) => setCuerpo(e.target.value)}
          ></textarea>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} appearance="primary" type="button">
            Enviar
          </Button>
          <Button onClick={handleClose} appearance="default">
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalSolicitarProducto;
