const moongose = require("mongoose");

const serviceSchema = new moongose.Schema({
  title: { type: String, required: true, unique: true },
  file: [
    {
      name: { type: String },
      link: { type: String },
    },
  ],
  info: [
    {
      text: { type: String },
      multimedia: { type: String, enum: ["video", "image"] },
    },
  ],
});

module.exports = moongose.model("Service", serviceSchema);
