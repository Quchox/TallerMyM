import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import "../styles/fin.css";
import AgregarProveedor from "../components/AgregarGastoOperativo";
import ListadoGastosOperativos from "../components/ListadoGastosOperativos";

const GastosOperativos = () => {

    return (
        <div className="container mt-3 rounded-0 p-3">
            <div className="row">

                <div className="col col-6">
                    <AgregarProveedor />
                </div>
                <div className="col col-6">
                    <ListadoGastosOperativos />
                </div>

            </div>
            <Link to="/Dashboard" className="btn btn-primary">Dashboard</Link>
            <hr/>

            

        </div>
    )
}
export default GastosOperativos;
