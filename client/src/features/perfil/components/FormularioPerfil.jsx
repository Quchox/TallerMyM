import React, { useState} from "react";

const FormularioPerfil = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [apellido, setApellido] = useState("");
  const [role, setRole] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [emailError, setEmailError] = useState("");


  const handleSubmit =  async (event) => {
    event.preventDefault();

  const form = event.target;

    if (!form.checkValidity()) {
      setIsValidated(true);
      return;
    }
    

    onSubmit({ email, nombre, apellido, role });
  };

  const checkEmail = async () => {
    if(!email) return;
    try {
      const response = await fetch("http://localhost:3000/api/usuario/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.status === 400) {
        setEmailError(data.message || "El correo ya está registrado.");
      } else {
        setEmailError("");
      }
    } catch (error) {
      console.error("Error verificando el correo:", error);
    }
  };

  return (
    <form className={`needs-validation ${isValidated ? "was-validated" : ""}`} noValidate onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="firstName" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <div className="invalid-feedback">Ingrese un nombre válido.</div>
        </div>

        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">Apellidos</label>
          <input type="text" className="form-control" id="lastName" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
          <div className="invalid-feedback">Ingrese apellidos válidos.</div>
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">Correo</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkEmail} required />
          <div className="invalid-feedback">Ingrese un correo válido.</div>
          {emailError && <div className="invalid-feedback d-block">{emailError}</div>}
        </div>
      </div>

      <h4 className="mb-3">Rol</h4>
      <div className="my-3">
        {["Mecánico", "Cliente", "Gerente", "Director", "Sector Financiero"].map((r) => (
          <div className="form-check" key={r}>
          <input
              id={`role${r}`}
              name="role"
              type="radio"
              className="form-check-input"
              value={r}
              checked={role === r}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <label className="form-check-label" htmlFor={`role${r}`}>
              {r}
            </label>
          </div>
        ))}
      </div>

      <hr className="my-4" />
      <button className="w-100 btn btn-primary btn-lg" type="submit">Crear perfil</button>
    </form>
  );
};

export default FormularioPerfil;