const { hashPassword } = require("../../../utils/password-bcrypt");
const User = require("../../../models/A3E/Users");

//Funcion para guardar un usuario
const save = async (name, lastname, email, password, role, status) => {
  try {
    //Validar campos
    if (!name || !lastname || !email || !password)
      throw new Error("Missing fields");

    //Llamar funcion para encriptar la contraseña
    const hashedPassword = await hashPassword(password);

    //Crear usuario
    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
    });
    //Guardar usuario
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

//Exportar funcion
module.exports = { save };
