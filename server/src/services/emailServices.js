const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: emailConfig.auth
});

const sendEmail = async (email, nombre) => {
    const mailOptions = {
        from: `"Taller Mecánico MYM" <${emailConfig.auth.user}>`,
        to: email,
        subject: '¡Perfil Creado con Éxito!',
        text: `Hola ${nombre},\n\nTu perfil ha sido creado exitosamente en nuestro sistema.\n\nSaludos,\nEquipo del Taller Mecánico MYM`,
        html: `
            <h3>Hola ${nombre},</h3>
            <p>Tu perfil ha sido creado exitosamente en nuestro sistema.</p>
            <p>Saludos,<br>Equipo del <b>Taller Mecánico MYM</b></p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Correo enviado: ${info.messageId}`);
        return 'Correo enviado exitosamente';
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        throw new Error('No se pudo enviar el correo. Verifica las credenciales.');
    }
};

module.exports = { sendEmail };