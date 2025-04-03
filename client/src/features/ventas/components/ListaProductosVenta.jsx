import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaProductosVenta = ({ onUpdateMontoTotal }) => {
  const { idVenta } = useParams();
  const [reload, setReload] = useState(0);//listado
  const [productos, setProductos] = useState([]);//listado

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/ventas/obtener-productos-venta/${parseInt(idVenta)}`);
        setProductos(data)

        // Calcular y enviar el subtotal al padre
        const nuevoSubtotal = data.reduce((acc, p) =>
          acc + p.montoFinalUnitario * p.cantidad, 0
        );
        onUpdateMontoTotal(nuevoSubtotal);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    if (idVenta) {
      obtenerDatos();
    }
  }, [idVenta, reload]);

  // Calcular subtotal, IVA y total con IVA
  const subtotal = productos.reduce(
    (acc, producto) => acc + producto.montoFinalUnitario * producto.cantidad,
    0
  );
  const iva = subtotal * 0.13;
  const totalConIva = subtotal + iva;

  // Remover producto de la venta
  async function RemoverProductoVenta(id, idProductoParam, cantidadParam) {
    Swal.fire({
      title: "¿Seguro que desea remover este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Remover",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const deleteData = {
            idProductoVenta: parseInt(id),
            idProducto: parseInt(idProductoParam),
            cantidad: parseInt(cantidadParam)
          };

          await axios.post(`${BASE_URL}/ventas/eliminar-producto-venta/`, deleteData);
          setReload(prev => prev + 1);

          Swal.fire({
            text: "Producto removido correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });

        } catch (error) {
          Swal.fire({
            text: "Error al remover producto",
            icon: "error",
            showConfirmButton: false
          });
          console.error("Error al eliminar el producto:", error);
        }
      }
    });
  }
  return (
    <div className="">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Monto Unitario</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            <>
              {productos.map((producto) => (
                <tr key={producto.idProducto}>
                  <td className="text-center">{producto.nombreProducto}</td>
                  <td className="text-center">x {producto.cantidad}</td>
                  <td className="text-center">₡ {producto.montoFinalUnitario}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm text-white btn-danger"
                      onClick={() =>
                        RemoverProductoVenta(
                          producto.idProductoVenta,
                          producto.idProducto,
                          producto.cantidad
                        )
                      }
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {/* Fila Subtotal */}
              <tr>
                <td colSpan="2" className="text-center">
                  Subtotal
                </td>
                <td className="text-center">
                  ₡ {subtotal.toFixed(2)}
                </td>
                <td></td>
              </tr>
              {/* Fila IVA */}
              <tr>
                <td colSpan="2" className="text-center">
                  IVA (13%)
                </td>
                <td className="text-center">
                  ₡ {iva.toFixed(2)}
                </td>
                <td></td>
              </tr>
              {/* Fila Total con IVA */}
              <tr>
                <td colSpan="2" className="text-center">
                  <strong>Total con IVA</strong>
                </td>
                <td className="text-center">
                  <strong>₡ {totalConIva.toFixed(2)}</strong>
                </td>
                <td></td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No hay productos en esta venta
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}
export default ListaProductosVenta;