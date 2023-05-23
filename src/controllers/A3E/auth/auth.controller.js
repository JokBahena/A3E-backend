const { Response, Router } = require("express");
const { login } = require("./auth.gateway");

//Funcion para iniciar sesion
const signin = async (req, res = Response) => {
  try {
    //Extraer datos del body
    const { email, password } = req.body;

    //Llamar funcion para iniciar sesion
    const token = await login(email, password);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error signing in",
    });
  }
};

//Ruta para iniciar sesion
const authRouter = Router();

//Definir ruta
authRouter.post("/signin", [], signin);

//Exportar ruta
module.exports = { authRouter };
