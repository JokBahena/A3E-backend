const moongose = require("mongoose");

const internSchema = new moongose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  age: { type: Number, required: true },
  institution: { type: String, required: true },
  typePeriod: {
    type: String,
    enum: ["cuatrimestre", "trimestre", "bimestre", "semestre"],
    required: true,
  },
  typePractice: {
    type: String,
    enum: [
      "modelo dual",
      "becario",
      "estadias",
      "practicas",
      "servicio",
      "estancia",
    ],
    required: true,
  },
  degree: { type: String, required: true },
  source: { type: String, required: true },
  info: { type: String },
});

module.exports = moongose.model("Intern", internSchema);
