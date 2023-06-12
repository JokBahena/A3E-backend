const mongoose = require('mongoose');

const galerySchema = new mongoose.Schema({
    multimedia: { type: String },
});

module.exports = mongoose.model('Galery', galerySchema);