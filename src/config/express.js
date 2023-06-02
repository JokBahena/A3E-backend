const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Import routes
const {
  authRouter,
  userRouter,
  topicRouter,
  vacancieRouter,
  internRouter,
  subscriptionRouter,
  bannerRouter,
} = require("../controllers/routes");

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
app.use("/api/vacancie", vacancieRouter);
app.use("/api/intern", internRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/banner", bannerRouter);

//Export app
module.exports = {
  app,
};
