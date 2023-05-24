const bcrypt = require("bcrypt");

//Function to validate password
const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

//Export function
module.exports = { validatePassword };
