const moongose = require("mongoose");

const pruebaTinySchema = new moongose.Schema({
  content: { type: String },
});

module.exports = moongose.model("PruebaTiny", pruebaTinySchema);
