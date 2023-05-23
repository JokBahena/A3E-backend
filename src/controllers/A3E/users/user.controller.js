const { Response, Router } = require("express");
const { save } = require("./user.gateway");

//Funcion para guardar y enviar los datos
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extraer datos del body
    const { name, lastname, email, password } = req.body;

    //Llamar funcion para guardar y enviar los datos
    const user = await save(name, lastname, email, password);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving user",
    });
  }
};

//Ruta para guardar y enviar los datos
const userRouter = Router();

//Definir ruta
userRouter.post("/createUser", [], saveAndFlush);

//Exportar ruta
module.exports = { userRouter };
