const moongose = require('mongoose');

//Create schema
const subscriptionSchema = new moongose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
});

//Export model
module.exports = moongose.model('Subscription', subscriptionSchema);