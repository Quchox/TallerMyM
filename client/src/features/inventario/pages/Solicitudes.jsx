import React, { useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import axios from "axios";
import TablaSolicitudes from "../components/TablaSolicitudes";
import "../styles/inv.css";

const Solicitudes = () => {
  const navigate = useNavigate(); // Hook para navegar
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
  };

  return (
    <div className="">
      <TablaSolicitudes />
    </div>
  );
};

export default Solicitudes;
