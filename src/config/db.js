const mongoose = require("mongoose");
require("dotenv").config();

const { DB_USER, DB_PASS } = process.env;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.jsj1vov.mongodb.net/`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexcion con mongodb establecido correctamente"))
  .catch((error) => console.log("Error al conectar con mongodb", error));
