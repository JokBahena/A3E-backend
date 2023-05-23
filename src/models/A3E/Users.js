const mongoose = require("mongoose");

// Crear esquema de usuarios
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  status: { type: Boolean, default: true },
});

// Exportar modelo
module.exports = mongoose.model("User", userSchema);
