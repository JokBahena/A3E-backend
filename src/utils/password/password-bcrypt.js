const bcrypt = require("bcrypt");

//Function to hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

//Export function
module.exports = { hashPassword };
