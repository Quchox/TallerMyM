import { useState } from "react";
import { Input, Button, Form, Schema } from "rsuite";
import "../styles/form.css";

const { StringType } = Schema.Types;

const model = Schema.Model({
  placaVehiculo: StringType().isRequired("La placa del vehículo es obligatoria"),
  modeloVehiculo: StringType().isRequired("El modelo del vehículo es obligatorio"),
  marcaVehiculo: StringType().isRequired("La marca del vehículo es obligatoria"),
  annoVehiculo: StringType().isRequired("El año del vehículo es obligatorio"),//investigar si lo tengo que pasar a int
  tipoVehiculo: StringType().isRequired("El tipo de vehículo es obligatorio"),
  idCliente: StringType().isRequired("El ID del cliente es obligatorio"),//investigar si lo tengo que pasar a int
});


const CreateForm = () => {
  const [formValue, setFormValue] = useState({
    placaVehiculo: "",
    modeloVehiculo: "",
    marcaVehiculo: "",
    annoVehiculo: "",
    tipoVehiculo: "",
    idCliente: "",
    
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/vehiculos/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) throw new Error("Error al registrar el vehiculo");

      alert("Vehiculo registrado exitosamente");
      setFormValue({
        placaVehiculo: "",
        modeloVehiculo: "",
        marcaVehiculo: "",
        annoVehiculo: "",
        tipoVehiculo: "",
        idCliente: "",
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el Vehiculo");
    }
  };

  return (
    <div className="form-container">
      <Form model={model} onChange={setFormValue} formValue={formValue} fluid>
        <Form.Group>
          <Form.ControlLabel>Placa del Vehiculo</Form.ControlLabel>
          <Form.Control name="placaVehiculo" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Modelo del Vehiculo</Form.ControlLabel>
          <Form.Control name="modeloVehiculo" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Marca del Vehiculo</Form.ControlLabel>
          <Form.Control name="marcaVehiculo" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Año del vehiculo</Form.ControlLabel>
          <Form.Control name="annoVehiculo" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Tipo de vehiculo </Form.ControlLabel>
          <Form.Control name="tipoVehiculo"  />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Id cliente</Form.ControlLabel>
          <Form.Control name="idCliente" />
        </Form.Group>
        <Button appearance="primary" onClick={handleSubmit}>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default CreateForm;
