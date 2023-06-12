const mongoose = require("mongoose");

const pruebaTinySchema = new mongoose.Schema({
  content: { type: String },
});

module.exports = mongoose.model("PruebaTiny", pruebaTinySchema);
