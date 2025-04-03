const express = require('express');
const Usuario = require('../../models/usuario/usuario'); 
const { sendEmail } = require('../../services/emailServices'); 

const router = express.Router();


// Ruta para verificar si el correo está registrado
router.post('/api/usuario/send-email', async (req, res) => {
  const { email, nombre } = req.body;

  // Validación de entrada
  if (!email || !nombre) {
    return res.status(400).json({ success: false, message: 'El correo y nombre son obligatorios' });
  }

  try {
    // Buscar el correo en la base de datos
    const user = await Usuario.findOne({ email: email });  // Uso de Usuario.findOne para buscar por email

    if (user) {
      return res.json({ success: false, message: 'El correo ya está registrado' });
    }

    // Enviar correo si el usuario no está registrado
    await sendEmail(email, nombre);

    return res.json({ success: true, message: 'El correo enviado correctamente' });
  } catch (error) {
    console.error('Error al verificar correo:', error);
    return res.status(500).json({ success: false, message: 'Error al acceder a la base de datos' });
  }
});

module.exports = router;