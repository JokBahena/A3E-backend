const { app } = require("./config/express");

//Conectar a la base de datos
const db = require("./utils/mongodb");

//Iniciar el servidor
const main = () => {
  app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
  });
};

//Llamar funcion para iniciar el servidor
main();
