const moongose = require("mongoose");

//Create schema
const bannerSchema = new moongose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String, required: true },
  link: { type: String },
  status: { type: Boolean, default: true },
});

//Export model
module.exports = moongose.model("Banner", bannerSchema);
