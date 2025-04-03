import { Route, Routes } from "react-router-dom";
import React from "react";
import { Card, Text, Button, TagGroup, Tag } from "rsuite";
import { Link } from "react-router-dom";

import "../../../styles/style.css";

import { MdPersonSearch } from "react-icons/md";

import { IoMdPersonAdd } from "react-icons/io";

import { FaUserEdit } from "react-icons/fa";

import { AiOutlineUserDelete } from "react-icons/ai";



const IndexCli = () => {
  return (
    <div className="container mt-5 p-3">
    <div className="row gap-5 justify-content-center">

    <div className="col-sm-3 align-self-center">
        <Link to="/clientes/obtenerclientes" className="btn-link text-decoration-none">
          <Card width={300} direction="row" className="p-2">
            <Card.Header><MdPersonSearch  size={55} color="#005ba5" className="d-flex align-self-baseline"/></Card.Header>
            <Card.Body as="h4" className="d-flex align-self-baseline">Buscar Cliente</Card.Body>
          </Card>
        </Link>
      </div>

    <div className="col-sm-3 align-self-center">
        <Link to="/clientes/registrar" className="btn-link text-decoration-none">
          <Card width={300} direction="row" className="p-2">
            <Card.Header><IoMdPersonAdd size={55} color="#005ba5" className="d-flex align-self-baseline"/></Card.Header>
            <Card.Body as="h4" className="d-flex align-self-baseline">Agregar Cliente</Card.Body>
          </Card>
        </Link>
      </div>

      <div className="col-sm-3 align-self-center">
        <Link to="/clientes/list-edit" className="btn-link text-decoration-none">
          <Card width={300} direction="row" className="p-2">
            <Card.Header><FaUserEdit size={55} color="#005ba5" className="d-flex align-self-baseline"/></Card.Header>
            <Card.Body as="h4" className="d-flex align-self-baseline">Editar<br/>Cliente</Card.Body>
          </Card>
        </Link>
      </div>

      <div className="col-sm-3 align-self-center">
        <Link to="/clientes/list-elim" className="btn-link text-decoration-none">
          <Card width={300} direction="row" className="p-2">
            <Card.Header><AiOutlineUserDelete size={55} color="#005ba5" className="d-flex align-self-baseline"/></Card.Header>
            <Card.Body as="h4" className="d-flex align-self-baseline">Eliminar Cliente</Card.Body>
          </Card>
        </Link>
      </div>

      
    </div>
  </div>
  );
};

export default IndexCli;
