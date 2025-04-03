import { useState } from "react";
import { Input, Button, Form, Schema } from "rsuite";
import "../styles/form.css";

const { StringType } = Schema.Types;

const model = Schema.Model({
  nombre: StringType().isRequired("El nombre es obligatorio"),
  apellido: StringType().isRequired("El apellido es obligatorio"),
  cedula: StringType().isRequired("La cédula es obligatoria"),
  correo: StringType().isEmail("Correo inválido").isRequired("El correo es obligatorio"),
  telefono: StringType().isRequired("El teléfono es obligatorio"),
});

const CreateForm = () => {
  const [formValue, setFormValue] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    correo: "",
    telefono: "",
    fechaRegistro: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/clientes/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) throw new Error("Error al registrar cliente");

      alert("Cliente registrado exitosamente");
      setFormValue({
        nombre: "",
        apellido: "",
        cedula: "",
        correo: "",
        telefono: "",
        fechaRegistro: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al registrar el cliente");
    }
  };

  return (
    <div className="form-container">
      <Form model={model} onChange={setFormValue} formValue={formValue} fluid>
        <Form.Group>
          <Form.ControlLabel>Nombre</Form.ControlLabel>
          <Form.Control name="nombre" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Apellido</Form.ControlLabel>
          <Form.Control name="apellido" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Cédula</Form.ControlLabel>
          <Form.Control name="cedula" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Correo</Form.ControlLabel>
          <Form.Control name="correo" type="email" />
        </Form.Group>
        <Form.Group>
          <Form.ControlLabel>Teléfono</Form.ControlLabel>
          <Form.Control name="telefono" />
        </Form.Group>
        <Button appearance="primary" onClick={handleSubmit}>
          Registrar
        </Button>
      </Form>
    </div>
  );
};

export default CreateForm;
