const mongoose = require("mongoose")

const newSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    type:{type: String, required: true},
    content: { type: String, required: true },
})

module.exports = mongoose.model("New", newSchema)