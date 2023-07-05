const moongose = require("mongoose");

const internSchema = new moongose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  institution: { type: String, required: true },
  typePractice: { type: String, required: true },
  degree: { type: String, required: true },
  period: { type: String, required: true },
  info: { type: String },
  status: { type: Boolean, default: false },
});

module.exports = moongose.model("Intern", internSchema);
