const moongose = require("mongoose");

const serviceSchema = new moongose.Schema({
  title: { type: String, required: true, unique: true },
  subtitle: { type: String },
  summary: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = moongose.model("Service", serviceSchema);
