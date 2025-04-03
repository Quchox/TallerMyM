import React, { useState } from "react";
import FormularioPerfil from "../components/FormularioPerfil";

const CrearPerfil = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data) => {
    if (!data.email) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }
    setIsSubmitting(true);
    try {
     
      const verifyResponse = await fetch("http:/localhost:3000/api/usuario/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, nombre: data.nombre }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        alert(verifyData.message);
        setIsSubmitting(false);
        return;
      }


      const response = await fetch("localhost:3000/api/email/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email : data.email, nombre: data.nombre}),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.message || "Error al enviar el correo.";
        throw new Error(errorMessage);
      }
    
      alert("Correo verificado correctamente.");
    } catch (error) {
      alert(`Hubo un error al intentar enviar el correo: ${error.message}`);
    }finally{
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Crear Perfil</h2>
          <p className="lead">Complete el formulario para crear un perfil de usuario</p>
        </div>

        <FormularioPerfil onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
      </main>
    </div>
  );
};

export default CrearPerfil;