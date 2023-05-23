const bcrypt = require("bcrypt");

//Funcion para validar la contraseña
const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

//Exportar funcion
module.exports = { validatePassword };
