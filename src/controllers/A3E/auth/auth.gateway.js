const { generateToken } = require("../../../config/jwt");
const { validatePassword } = require("../../../utils/validate-password");
const User = require("../../../models/A3E/user");

//Function to login
const login = async (email, password) => {
  try {
    //Search user
    const user = await User.findOne({ email });

    //Validate user
    if (!user) return { msg: "User not found" };

    //Validate password
    if (await validatePassword(password, user.password)) {
      //Generate token
      return {
        token: generateToken({
          email: user.email,
          id: user._id,
          name: user.name,
        }),
      };
    }
    return { msg: "Invalid password" };
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = { login };
