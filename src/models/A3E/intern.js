const moongose = require("mongoose");

const internSchema = new moongose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  age: { type: Number, required: true },
  institution: { type: String, required: true },
  period: { type: String, required: true },
  typePractice: { type: String, required: true },
  degree: { type: String, required: true },
  info: { type: String },
});

module.exports = moongose.model("Intern", internSchema);
