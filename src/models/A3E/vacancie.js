const moongose = require("mongoose");

const vacancieSchema = new moongose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  residence: { type: String, required: true },
  education: { type: String, required: true },
  position: { type: String, required: true },
  source: { type: String, required: true },
  curriculum: { type: String, required: true },
});

module.exports = moongose.model("Vacancie", vacancieSchema);
