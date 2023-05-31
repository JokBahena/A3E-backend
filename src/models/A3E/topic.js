const mongoose = require("mongoose");

//Create schema
const topicSchema = new mongoose.Schema({
  section: [
    {
      nameSection: { type: String, required: true },
      topic: [
        {
          nameTopic: { type: String, required: true },
          description: { type: String, required: true },
          multimedia: [
            {
              link: { type: String },
              type: { type: String, enum: ["video", "image", "pdf"] },
            },
          ],
        },
      ],
    },
  ],
});

//Export model
module.exports = mongoose.model("Topic", topicSchema);
