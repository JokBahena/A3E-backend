const bcrypt = require("bcrypt");

//Funcion para encriptar la contraseña
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//Exportar funcion
module.exports = { hashPassword };
