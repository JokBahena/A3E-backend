const moongose = require("mongoose");

const saleSchema = new moongose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    typeService: { type: String, required: true },
    enterprise: { type: String, required: true },
    address: { type: String, required: true },
    info: { type: String },
});

module.exports = moongose.model("Sale", saleSchema);