const moongose = require("mongoose");

const saleSchema = new moongose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    typeService: { type: String, required: true },
    enterprise: { type: String, required: true },
    address: { type: String, required: true },
    info: { type: String },
    status: { type: Boolean, default: false },
});

module.exports = moongose.model("Sale", saleSchema);