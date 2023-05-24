const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
require("dotenv").config();

//Create transporter
const transporter = nodemailer.createTransport(
  smtpTransport({
    // host: process.env.EMAIL_HOST,
    // service: process.env.EMAIL_SERVICE,
    // auth: {
    //   user: process.env.EMAIL_USER,
    //   pass: process.env.EMAIL_PASS,
    // },
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
);

//Structure of email
const template = () => {
  const url = "http://google.com";
  const token = "123456789";
  const link = ' <a href="' + url + token + '">Reestablecer contraseña</a> ';
  const img =
    "https://res.cloudinary.com/a3e-media/image/upload/v1684799079/test/test-image.jpg";
  const firma =
    '<div style="display: flex; align-items: center;">' +
    '<img src="' +
    img +
    '" alt="Logo SIOCU" width="100" height="100" style="margin-right: 20px;">' +
    "<div>" +
    '<h3 style="font-family: Arial, sans-serif; font-size: 24px; line-height: 1.2; color: #002e60;">A3E Ingenieros</h3>' +
    '<p style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #002e60;">a3e.ingenieros@gmail.com</p>' +
    "</div>" +
    "</div>";

  return (body =
    "<html>" +
    "<head>" +
    "<style>" +
    "h2 { font-family: Arial, sans-serif; font-size: 24px; line-height: 1.2; color: #002e60; }" +
    "p { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #002e60; }" +
    "a { color: #002e60; text-decoration: underline; }" +
    "</style>" +
    "</head>" +
    "<body>" +
    "<h2>Hola, estimado usuario.</h2>" +
    "<p>" +
    "Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en A3E. Si no has solicitado el restablecimiento de contraseña, puedes ignorar este mensaje." +
    "</p>" +
    "<p>" +
    "Para restablecer tu contraseña, haz clic en el siguiente enlace:" +
    link +
    "</p>" +
    "<p>" +
    "Este enlace es válido por 30 minutos. Si no realizas el restablecimiento de contraseña dentro de este plazo, deberás solicitar un nuevo enlace." +
    "</p>" +
    "<p>" +
    "Por motivos de seguridad, te recomendamos que elijas una contraseña segura que no hayas utilizado antes y que no compartas tu contraseña con nadie. Si tienes alguna pregunta o necesitas ayuda para restablecer tu contraseña, no dudes en contactarnos." +
    "</p>" +
    firma +
    "</body>" +
    "</html>");
};

//Export function
module.exports = { transporter, template };
