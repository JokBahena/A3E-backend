const moongose = require("mongoose");

//Create schema
const contactSchema = new moongose.Schema({
  type: { type: String, required: true },
  contact: { type: String, required: true },
});

//Export model
module.exports = moongose.model("Contact", contactSchema);
