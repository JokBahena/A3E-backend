const moongose = require("mongoose");

const vacancieSchema = new moongose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  education: { type: String, required: true },
  position: { type: String, required: true },
  source: { type: String, required: true },
  curriculum: { type: String, required: true },
});

module.exports = moongose.model("Vacancie", vacancieSchema);
