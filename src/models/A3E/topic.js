const mongoose = require("mongoose");

//Create schema
const topicSchema = new mongoose.Schema({
  nameSection: { type: String, required: true, unique: true },
  topics: [
    {
      nameTopic: { type: String, required: true },
      description: { type: String, required: true },
      multimedias: [
        {
          multimedia: { type: String },
        },
      ],
    },
  ],
});

//Export model
module.exports = mongoose.model("Topic", topicSchema);
