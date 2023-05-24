const mongoose = require("mongoose");
require("dotenv").config();

//Extract data from .env
const { DB_USER, DB_PASS, DB_NAME } = process.env;

//Url to connect to mongodb
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.jsj1vov.mongodb.net/${DB_NAME}`;

//Connect to mongodb
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connection to mongodb successful"))
  .catch((error) => console.log("Connection error", error));
