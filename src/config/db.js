const mongoose = require("mongoose");

// const url = "";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexcion con mongodb establecido correctamente"))
  .catch((error) => console.log("Error al conectar con mongodb", error));
