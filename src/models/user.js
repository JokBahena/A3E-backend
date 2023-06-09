const mongoose = require("mongoose");

//Create schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: Boolean, default: false },
});

//Export model
module.exports = mongoose.model("User", userSchema);
