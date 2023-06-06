const moongose = require("mongoose");

const serviceSchema = new moongose.Schema({
  title: { type: String, required: true, unique: true },
  files: [
    {
      file: { type: String },
    },
  ],
  info: [
    {
      text: { type: String },
    },
  ],
  multimedias: [
    {
      multimedia: { type: String },
    },
  ],
});

module.exports = moongose.model("Service", serviceSchema);
