const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configuration puerto
app.set("port", process.env.PORT || 3000);

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Bienvenido a A3E Ingenieros :)");
});

module.exports = {
  app,
};
