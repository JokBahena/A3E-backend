const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importar rutas
const { authRouter, userRouter } = require("../controllers/routes");

// Inicializar express
const app = express();
// Configuration puerto
app.set("port", process.env.PORT || 3000);

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Bienvenido a A3E Ingenieros :)");
});

// Configuración de CORS
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Exportar app
module.exports = {
  app,
};
