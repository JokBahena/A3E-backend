const jtw = require("jsonwebtoken");
require("dotenv").config();

//Function to generate token
const generateToken = (payload) => {
  return jtw.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

//Export function
module.exports = {
  generateToken,
};
