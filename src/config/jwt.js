const jtw = require("jsonwebtoken");
require("dotenv").config();

//Funcion para generar el token
const generateToken = (payload) => {
  return jtw.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

//Exportar funcion
module.exports = {
  generateToken,
};
