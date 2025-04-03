import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "rsuite";
import axios from "axios";
import Swal from "sweetalert2";
const { Column, HeaderCell, Cell } = Table;

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//al dar al boton aprovar o rechazar trae el id del elemento mas el bool de true o false del boton
//donde envia un post para hace un update put donde se cambie su estado de aprobado.
const handleDecision = async (idSolicitud, aprobado) => {
  console.log(`ID: ${idSolicitud}, Decisión: ` + aprobado);

  try {
    const response = await axios.put(
      `${BASE_URL}/inventario/procesar-solicitud`,{ idSolicitud, aprobado });
    console.log(response);
    Swal.fire({
      icon: "success",
      title: "Solicitud procesada correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al procesarla solicitud",
      text: error.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }finally {
    window.location.reload();
  }  
};

const TablaSolicitudes = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Obtener listado
  useEffect(() => {
    axios
      .get(`${BASE_URL}/inventario/solicitud`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching solicitudes:", error));
  }, []);

  // Abrir modal y setear la fila seleccionada
  const handleOpen = (rowData) => {
    setSelectedRow(rowData);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="mt-5 d-flex justify-content-center align-items-center min-vh-100">
      <Table
        height={800}
        width={1000}
        data={data}
        className="rounded-3 shadow-sm"
        onRowClick={(rowData) => console.log()}
      >
        <Column width={200} align="center" fixed>
          <HeaderCell>Titulo</HeaderCell>
          <Cell dataKey="titulo" />
        </Column>

        <Column width={200}>
          <HeaderCell>usuario</HeaderCell>
          <Cell dataKey="usuario" />
        </Column>

        <Column width={200}>
          <HeaderCell>fecha</HeaderCell>
          <Cell>
            {(rowData) => (
              <input
                type="date"
                className="form-control"
                value={rowData.fecha ? rowData.fecha.split("T")[0] : ""}
                readOnly
              ></input>
            )}
          </Cell>
        </Column>

        <Column width={200}>
          <HeaderCell>Aprobado</HeaderCell>
          <Cell>
            {(rowData) => (
              <>
                <button
                  className="me-2 btn btn-success btn-sm text-white"
                  onClick={() => handleDecision(rowData.idSolicitud, true)}
                >
                  Aprobar
                </button>
                <button
                  className="btn btn-danger btn-sm text-white"
                  onClick={() => handleDecision(rowData.idSolicitud, false)}
                >
                  Rechazar
                </button>
              </>
            )}
          </Cell>
        </Column>

        <Column width={200}>
          <HeaderCell>Acciones</HeaderCell>
          <Cell>
            {(rowData) => (
              <button
                className="mb-5 px-3 btn btn-outline-secondary btn-sm text-primary"
                onClick={() => handleOpen(rowData)}
              >
                Detalle
              </button>
            )}
          </Cell>
        </Column>
      </Table>
      {selectedRow && (
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Detalle de Solicitud</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedRow.cuerpo}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="primary">
              Ok
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default TablaSolicitudes;
