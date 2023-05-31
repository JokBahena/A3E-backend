const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Import routes
const { authRouter, userRouter, topicRouter } = require("../controllers/routes");

//Create app express
const app = express();

//Configurate port
app.set("port", process.env.PORT || 3000);

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Bienvenido a A3E Ingenieros :)");
});

//Configurate cors
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/topic", topicRouter);

//Export app
module.exports = {
  app,
};
