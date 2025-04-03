import "../styles/ven.css";
import React, { useState, useEffect } from "react";
import { Text, Row, Col, Modal, Button } from "rsuite";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SelectProductos from "../components/SelectProductos";
import ListaProductosVenta from "../components/ListaProductosVenta";
import Swal from "sweetalert2";
import Pago from "../components/Pago";
import Devolucion from "../components/Devolucion";

export const BASE_URL = import.meta.env.VITE_API_URL;

const Venta = () => {
  const { idVenta } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  // Estado general para la venta (detalles)
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/ventas/obtener-venta/${idVenta}`);
        setFormData(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    if (idVenta) obtenerDatos();
  }, [idVenta]);

  /* ============= PAGO ============= */
  const [formDataPago, setFormDataPago] = useState({
    idVenta: parseInt(idVenta),
    monto: 0,
    dineroVuelto: 0,
    metodoPago: "",
    subtotal: 0,
    iva: 0,
    total: 0,
  });
  const [openPago, setOpenPago] = useState(false);

  const handleChangePago = (e) => {
    const { name, value } = e.target;
    
    setFormDataPago((prev) => {
      const newPago = {
        ...prev,
        [name]: isNaN(value) || value.trim() === "" ? value : parseInt(value, 10),
      };
      handleUpdateMontoTotal(newPago.subtotal);
      
      return newPago;
    });
  };

  const GenerarPago = (id) => {
    setFormDataPago((prev) => ({
      ...prev,
      idVenta: parseInt(id),
    }));
    setOpenPago(true);
  };

  const verificarMetodoPago = () => {
    if (!formDataPago.metodoPago.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Debe seleccionar un método de pago",
      });
      return false;
    }
    return true;
  };

  const verificarPagoCompleto = () => {
    if (formDataPago.monto < formDataPago.montoTotal) {
      Swal.fire({
        icon: "warning",
        title: "El monto a pagar no es suficiente",
      });
      return false;
    } else {
      setFormDataPago((prevState) => ({
        ...prevState,
        dineroVuelto: parseFloat(prevState.monto - prevState.montoTotal),
      }));
      return true;
    }
  };

  const handleSubmitPago = async (e) => {
    e.preventDefault();

    if (verificarMetodoPago() && verificarPagoCompleto()) {
      try {
        console.log(formDataPago);

        const res = await axios.post(`${BASE_URL}/finanzas/registrar-pago/`, formDataPago);
        if (res.status === 200 || res.status === 201) {
          await Swal.fire({
            icon: "success",
            title: "Pago registrado correctamente",
            showConfirmButton: false,
            timer: 1000,
          });
          setOpenPago(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          await Swal.fire({
            icon: "warning",
            title: "Pago ya registrado",
            text: "Esta venta ya tiene un pago asociado.",
            showConfirmButton: true,
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error al registrar pago",
            text: "Hubo un problema con el servidor. Inténtalo de nuevo.",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    }
  };

  /* ============= DEVOLUCIÓN ============= */
  const [formDataDevolucion, setFormDataDevolucion] = useState({
    idVenta: parseInt(idVenta),
    monto: 0,
    dineroVuelto: 0,
    montoTotal: 0,
    motivo: ""
  });
  const [openDevolucion, setOpenDevolucion] = useState(false);

  const handleChangeDevolucion = (e) => {
    const { name, value } = e.target;
    setFormDataDevolucion((prev) => ({
      ...prev,
      [name]:
        isNaN(value) || value.trim() === ""
          ? value
          : parseInt(value, 10),
    }));
  };

  const GenerarDevolucion = (id) => {
    setFormDataDevolucion((prev) => ({
      ...prev,
      idVenta: parseInt(id),
    }));
    setOpenDevolucion(true);
  };

  const verificarMotivoDevolucion = () => {
    if (!formDataDevolucion.motivo.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Debe ingresar un motivo para la devolución",
      });
      return false;
    }
    return true;
  };

  const verificarDevolucionCompleta = () => {
    if (formDataDevolucion.monto <= 0) {
      Swal.fire({
        icon: "warning",
        title: "El monto a devolver debe ser mayor a 0",
      });
      return false;
    }
    return true;
  };

  const handleSubmitDevolucion = async (e) => {
    e.preventDefault();
    if (verificarMotivoDevolucion() && verificarDevolucionCompleta()) {
      try {
        const res = await axios.post(`${BASE_URL}/finanzas/registrar-devolucion/`, formDataDevolucion);
        if (res.status === 200 || res.status === 201) {
          await Swal.fire({
            icon: "success",
            title: "Devolución registrada correctamente",
            showConfirmButton: false,
            timer: 1000,
          });
          setOpenDevolucion(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          await Swal.fire({
            icon: "warning",
            title: "Devolución ya registrada",
            text: "Esta venta ya tiene una devolución asociada.",
            showConfirmButton: true,
          });
        } else {
          await Swal.fire({
            icon: "error",
            title: "Error al registrar devolución",
            text: "Hubo un problema con el servidor. Inténtalo de nuevo.",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      }
    }
  };

  /* ============= CALLBACK PARA ACTUALIZAR MONTO TOTAL ============= */
  const handleUpdateMontoTotal = (nuevosubtotal) => {
    setFormDataPago(prev => {
      const nuevoIva = nuevosubtotal * 0.13;
      const nuevoTotal = nuevosubtotal + nuevoIva;
      const dineroVuelto = parseFloat(prev.monto) 
        ? parseFloat(prev.monto) - nuevoTotal 
        : 0;
      
      return {
        ...prev,
        subtotal: nuevosubtotal,
        iva: nuevoIva,
        total: nuevoTotal,
        dineroVuelto: parseFloat(dineroVuelto.toFixed(2)),
      };
    });
  };

  //* =========== GENERAR FACTURA =========== *//
  const GenerarFactura = async () => {
    try {
      // Combina los datos de venta y pago en un solo objeto
      const payload = { ...formData, ...formDataPago };

      const response = await axios.post(
        `${BASE_URL}/reportes/generar-factura/`,
        payload,
        { responseType: 'blob' }
      );

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: "Factura generada exitosamente",
          showConfirmButton: false,
          timer: 1000,
        });

        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });

        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;

        // Intentar obtener el nombre del archivo desde el header
        const contentDisposition = response.headers['content-disposition'];
        let fileName = '';
        if (contentDisposition) {
          const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
          if (fileNameMatch && fileNameMatch.length === 2) {
            fileName = fileNameMatch[1];
          }
        }
        // Si no se recibió el nombre, se genera uno con la fecha actual
        if (!fileName) {
          const fechaActual = new Date().toISOString().split('T')[0];
          fileName = `Factura-${fechaActual}.xlsx`;
        }

        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      console.error("Error al generar la factura:", error);
      Swal.fire({
        icon: "error",
        title: "Error al generar la factura",
        text: "No se pudo generar el archivo XLSX.",
      });
    }
  };

  /* ============= RENDER ============= */
  return (
    <div className="mx-5 mt-3">
      <Row>
        {/* COLUMNA DETALLES DE VENTA */}
        <Col xs={14}>
          <div className="ven-col">
            <div className="d-flex flex-row ven-header bg-primary p-4 py-3">
              <Text size="xl" className="text-white">Detalles de Venta</Text>
            </div>
            <div className="p-4">
              <Row>
                {/* COLUMNA INFORMACIÓN */}
                <Col xs={11} className="d-grid gap-4">
                  <span>
                    <Text size="xxl">Código de orden:</Text>
                    <Text size="xl" muted>{formData.codigoOrden}</Text>
                  </span>
                  <span>
                    <Text size="xxl">Cliente:</Text>
                    <Text size="xl" muted>{formData.nombreCliente}</Text>
                  </span>
                  <span>
                    <Text size="xxl">Fecha de ingreso:</Text>
                    <Text size="xl" muted>
                      {formData.fechaIngreso ? new Date(formData.fechaIngreso).toLocaleDateString("es-CR") : ""}
                    </Text>
                  </span>
                  <span>
                    <Text size="xxl">Fecha de venta:</Text>
                    <Text size="xl" muted>
                      {formData.fechaVenta ? new Date(formData.fechaVenta).toLocaleDateString("es-CR") : ""}
                    </Text>
                  </span>
                  <span>
                    <Text size="xxl">Detalles de venta:</Text>
                    <Text size="xl" muted>{formData.VentaDetalles}</Text>
                  </span>
                  <span>
                    <Text size="xxl">Detalles de Orden:</Text>
                    <Text size="xl" muted>{formData.descripcionOrden}</Text>
                  </span>
                  <span>
                    <Text size="xxl">Vehículo:</Text>
                    <Text size="xl" muted>{formData.vehiculo}</Text>
                  </span>
                  <hr />
                  <div className="d-flex flex-column gap-3">
                    {/* BTN ABRIR MODAL REGISTRAR PAGO */}
                    <button className="btn btn-sm btn-secondary text-white"
                      onClick={() => GenerarPago(formData.idVenta)}
                    >
                      Registrar Pago
                    </button>
                    {/* BTN ABRIR MODAL DE DEVOLUCIÓN */}
                    <button className="btn btn-sm btn-secondary text-white"
                      onClick={() => GenerarDevolucion(formData.idVenta)}
                    >
                      Realizar reembolso
                    </button>
                    <button className="btn btn-sm btn-secondary text-white"
                      onClick={() => GenerarFactura()}
                    >
                      Generar Factura
                    </button>
                  </div>
                  {/* COMPONENTES QUE MUESTRAN DATOS DE PAGO Y DEVOLUCIÓN */}
                  <Pago />
                  <hr />
                  <Devolucion />
                </Col>
                {/* COLUMNA PRODUCTOS VINCULADOS + PRECIOS */}
                <Col xs={13} className="d-grid gap-4">
                  {/* Lista de productos asociados a la venta */}
                  <ListaProductosVenta

                    onUpdateMontoTotal={handleUpdateMontoTotal}
                  />
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        {/* COLUMNA SELECCIÓN DE PRODUCTOS */}
        <Col xs={10}>
          <div className="ven-col">
            <div className="d-flex flex-row ven-header bg-primary p-4 py-3">
              <Text size="xl" className="text-white">Agregar productos</Text>
            </div>
            <div className="p-4">
              {/* FILTRO PRODUCTOS */}
              <SelectProductos idVenta={idVenta} />
            </div>
          </div>
        </Col>
      </Row>

      {/* MODAL PARA REGISTRAR PAGO */}
      <Modal open={openPago} onClose={() => setOpenPago(false)}>
        <form onSubmit={handleSubmitPago}>
          <Modal.Header className="px-3 pt-3">
            <Modal.Title className="text-center">
              <Text size="xxl" className="text-secondary">Generar venta</Text>
            </Modal.Title>
            <hr className="text-secondary" />
          </Modal.Header>
          <Modal.Body className="px-4 d-flex flex-column gap-4">
            <div>
              <span>subtotal:</span>
              <input
                type="number"
                value={formDataPago.subtotal.toFixed(2)}
                readOnly
                className="form-control form-control-sm"
              />
            </div>
            <div>
              <span>IVA (13%):</span>
              <input
                type="number"
                value={formDataPago.iva.toFixed(2)}
                readOnly
                className="form-control form-control-sm"
              />
            </div>
            <div>
              <span>Total:</span>
              <input
                type="number"
                value={formDataPago.total.toFixed(2)}
                readOnly
                className="form-control form-control-sm"
              />
            </div>
            <div>
              <span>Monto:</span>
              <input
                type="number"
                min="0"
                name="monto"
                className="form-control form-control-sm"
                onChange={handleChangePago}
                value={formDataPago.monto}
              />
            </div>
            <div>
              <span>Método de pago:</span>
              <select
                onChange={handleChangePago}
                value={formDataPago.metodoPago}
                className="form-select form-select-sm"
                name="metodoPago"
              >
                <option value="">Seleccionar...</option>
                <option value="efectivo">Efectivo</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer className="p-3 mb-3">
            <Button appearance="primary" type="submit">Generar</Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* MODAL PARA REGISTRAR DEVOLUCIÓN */}
      <Modal open={openDevolucion} onClose={() => setOpenDevolucion(false)}>
        <form onSubmit={handleSubmitDevolucion}>
          <Modal.Header className="px-3 pt-3">
            <Modal.Title className="text-center">
              <Text size="xxl" className="text-secondary">Registrar Devolución</Text>
            </Modal.Title>
            <hr className="text-secondary" />
          </Modal.Header>
          <Modal.Body className="px-4 d-flex flex-column gap-4">
            <div>
              <span>Monto:</span>
              <input
                type="number"
                min="0"
                name="monto"
                className="form-control form-control-sm"
                onChange={handleChangeDevolucion}
                value={formDataDevolucion.monto}
              />
            </div>
            <div>
              <span>Motivo:</span>
              <textarea
                rows="3"
                name="motivo"
                className="form-control form-control-sm"
                onChange={handleChangeDevolucion}
                value={formDataDevolucion.motivo}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="p-3 mb-3">
            <Button appearance="primary" type="submit">Generar</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Venta;
