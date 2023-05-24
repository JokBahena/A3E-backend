const jwt = require("jsonwebtoken");
require("dotenv").config();

//Function to generate token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

//Export function
module.exports = {
  generateToken,
};

