import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BrowserRouter as Router, Link } from "react-router-dom";

// URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

const ListaTrabajadores = ({formData, trigger}) => {

    const [datos, setDatos] = useState([]);
    useEffect(() => {
        const getTrabajadores = async () => {
          try {
            const { data } = await axios.get(`${BASE_URL}/trabajadores/obtener-trabajadores/`);
            setDatos(data);
          } catch (error) {
            console.error("Error al obtener trabajadores:", error);
          }
        };
        getTrabajadores();
      }, [formData ,trigger]);
      
    function deleteTrabajador(id) {
        Swal.fire({
            text: "¿Seguro que desea eliminar este trabajador?",
            icon: "error",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-danger text-white',
                cancelButton: 'btn btn-secondary text-white'
              }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URL}/trabajadores/eliminar-trabajador/${id}`)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Trabajador eliminado correctamente",
                                showConfirmButton: false,
                                timer: 1500,
                            }).then(() => {
                                setDatos(datos.filter(trabajador => trabajador.idTrabajador !== id));
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error al eliminar trabajador",
                                showConfirmButton: false,
                                timer: 1000,
                            });
                        }
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo eliminar el trabajador",
                            showConfirmButton: true,
                        });
                    });
            }
        });
    }

    return (
        <div className="p-5">
            <table className="table table-hover table-striped shadow-sm">
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Cédula</th>
                        <th>Salario</th>
                        <th>Seguro Social</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datos.map((trabajador, index) => (
                        <tr key={index}>
                            <td>{trabajador.nombreCompleto}</td>
                            <td>{trabajador.cedula}</td>
                            <td>{"₡ " + trabajador.salario}</td>
                            <td>{trabajador.seguroSocial}</td>
                            <td>
                                <button type="button" onClick={() => deleteTrabajador(trabajador.idTrabajador)}
                                    className="btn btn-danger btn-sm text-white me-3">Eliminar</button>
                                <button className="btn btn-secondary btn-sm text-white">
                                    <Link to={`/trabajadores-editar/${trabajador.idTrabajador}`} className="btn-link">Editar</Link>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaTrabajadores;
