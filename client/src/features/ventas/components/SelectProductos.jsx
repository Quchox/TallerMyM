import React, { useState } from "react";
import { Text, Modal, Button } from "rsuite";
import axios from "axios";
import Swal from "sweetalert2";
import SelectMarca from "../../inventario/components/SelectMarca";
import SelectCategoria from "../../inventario/components/SelectCategoria";

//URL BASE
export const BASE_URL = import.meta.env.VITE_API_URL;

const SelectProductos = ({ idVenta }) => {
    const [productos, setProductos] = useState({});//listado
    const [loading, setLoading] = useState(true); // Estado para manejar la carga
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState({//Parametros para filtro
        nombre: "",
        marca: "",
        categoria: ""
    });
    const [formDataPost, setFormDataPost] = useState({
        idVenta: parseInt(idVenta),
        idProducto: parseInt(null),
        cantidad: 1 || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangePost = (e) => {
        const { name, value } = e.target;
        setFormDataPost({
            ...formDataPost,
            [name]: parseInt(value) || ""
        });
    };

    const handleBuscar = () => {
        obtenerDatos();
    };

    const obtenerDatos = async () => {
        try {
            setLoading(true); // Empieza la carga
            const { data } = await axios.post(`${BASE_URL}/productos/`, formData);
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    async function AgregarProducto(id) {
        await setFormDataPost({
            ...formDataPost,
            idProducto: id,

        });
        handleOpen(true);
    }

    const verificarCantidad = () => {
        if (!formDataPost.cantidad > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Debe ingresar la cantidad del producto'
            });
            return false;
        }
        return true;
    };

    //form enviar producto
    const handleSubmit = (e) => {
        e.preventDefault();

        if (verificarCantidad()) {

            console.log(formDataPost);

            axios.post(`${BASE_URL}/ventas/agregar-producto/`, formDataPost).then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Producto agregado correctamente",
                    showConfirmButton: false,
                    timer: 1000,
                }).then(() => {
                    window.location.reload();
                });
            }).catch((error) =>
                Swal.fire({
                    icon: "error",
                    title: "Error al agregar producto",
                    text: error,
                    showConfirmButton: false,
                    timer: 1000,
                })
            );

            setFormDataPost({
                ...formDataPost,
                cantidad: '',
            });
            handleClose(true)
        }
    };

    return (
        <div className="">
            <div className="px-4">
                <div className="row">
                    <div className="mb-3">
                        <span>Producto:</span>
                        <input
                            name="nombre"
                            className="form-control"
                            placeholder="Buscar por nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6">
                        <div>
                            <span>Marca:</span>
                            <SelectMarca
                                value={formData.marca}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <span>Categoria:</span>
                            <SelectCategoria
                                value={formData.categoria}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mt-3 row px-4">
                        <button className="btn btn-primary" onClick={handleBuscar}>Buscar</button>
                    </div>
                </div>
            </div>
            {/* MODAL */}
            <Modal open={open} onClose={handleClose} size="xs">
                <form onSubmit={handleSubmit}>
                    <Modal.Header className="px-3 pt-3">
                        <Modal.Title className="text-center">
                            <Text size="xxl" className="text-secondary">
                                Agregar Producto
                            </Text>
                        </Modal.Title>
                        <hr className="text-secondary" />
                    </Modal.Header>
                    <Modal.Body className="px-3">
                        <div>
                            <Text size="xl">Cantidad:</Text>
                            <input
                                name="cantidad"
                                type="number"
                                className="form-control form-control-sm"
                                min={1}
                                onChange={handleChangePost}
                                value={formDataPost.cantidad}
                            ></input>
                        </div>
                        <div className="my-4">

                        </div>
                    </Modal.Body>
                    <Modal.Footer className="p-3 mb-3">
                        <Button appearance="primary" type="submit">
                            Generar
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/* Listado de productos */}
            <div className="p-4">

                {loading ? (
                    <div></div>
                ) : (
                    <div className="scroll-container">
                        {/* Listado de productos */}
                        <table className="table table-stripped table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Marca</th>
                                    <th>Precio</th>
                                    <th>Agregar Producto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map(producto => (
                                    <tr key={producto.idProducto}>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.marca}</td>
                                        <td>₡ {producto.precio}</td>
                                        <td className="d-flex justify-content-center">
                                            {/* USAR MODAL AGREGAR */}
                                            <button className="btn btn-sm btn-primary"
                                                onClick={() => AgregarProducto(producto.idProducto)}
                                            >Agregar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SelectProductos;