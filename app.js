const express = require("express");
const bodyParser = require("body-parser");
const db = require("./src/config/db");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.log(err).stack;
  res.status(500).send("Error interno en el servidor");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
