const moongose = require("mongoose");

const dndSchema = new moongose.Schema({
    name: { type: String, required: true, unique: true },
    position: { type: String, required: true },
});

module.exports = moongose.model("Dnd", dndSchema);