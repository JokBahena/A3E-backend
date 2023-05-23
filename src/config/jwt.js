const jtw = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  return jtw.sign(payload, process.env.SECRET, { expiresIn: "1h" });
};

module.exports = {
  generateToken,
};
