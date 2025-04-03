import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "rsuite";

//URL Base
export const BASE_URL = import.meta.env.VITE_API_URL;

//constante de Productos
const ContenedorProductos = ({formData}) => {

  const [listado, setLista] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));//delay para evitar consumo innecesario
        const { data } = await axios.post(`${BASE_URL}/productos`,formData);

        setLista(data);
      } catch (error) {
        console.error("Error obteniendo las categorías:", error);
      }
    };

    if (formData) {
      obtenerProductos();
    }
  }, [formData]);

   //url get imagen para las previsualizaciones
   const getImg = (img) => img ? `${BASE_URL}/img/${img}` : "/noResult.png";


  return (
    <div className="article-container article-scroll">
      {listado.map((productos) => (
        <div
          key={productos.idProducto}
          className="card article border-0 rounded rounded-4"
        >
          <div className="imgFrame">
            <Link
              to={`/inventario-detalles/${productos.idProducto}`}
              className="btn-link"
            >
              <Image
                className="card-img-top"
                //src={getImg+productos.img}
                src={getImg(productos.img)}
                fallbackSrc="/noResult.png"
                alt=""
                style={{ width: "100%", minHeight: "120px" }}
              />
            </Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              <strong className="text-secondary">{productos.nombre}</strong>
            </h5>
            <span className="card-text">
              <strong className="text-dark">Categoría:</strong>{" "}
              {productos.categoria}
            </span>
            <br />
            <span className="card-text">
              <strong>Stock:</strong> {productos.stock}
            </span><br />
            <span className="card-text">
              <strong>Precio:</strong> ₡{productos.precio}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContenedorProductos;
