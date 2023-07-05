const { generateToken, verifyToken } = require("../../../config/jwt");
const {
  validatePassword,
} = require("../../../utils/password/validate-password");
const User = require("../../../models/user");

//Function to login
const login = async (email, password) => {
  try {
    //Search user
    const userExist = await User.findOne({ email });

    //Validate user
    if (!userExist) return { msg: "User not found" };

    //Validate password
    if (await validatePassword(password, userExist.password)) {
      //Generate token
      return {
        token: generateToken({
          id: userExist._id,
          email: userExist.email,
          name: userExist.name,
          role: userExist.role,
        }),

        data: {
          id: userExist._id,
          name: userExist.name,
          role: userExist.role,
        },
      };
    }
    return { msg: "Invalid password" };
  } catch (error) {
    console.log(error);
  }
};

//Function to renew token
const renew = async (token) => {
  try {
    //Verify token
    const decoded = await verifyToken(token);

    //Validate token
    if (!decoded) return { msg: "Invalid token" };

    //Search user
    const userExist = await User.findById(decoded.id);

    //Validate user
    if (!userExist) return { msg: "User not found" };

    //Generate token
    return {
      token: generateToken({
        id: userExist._id,
        email: userExist.email,
        name: userExist.name,
        lastname: userExist.lastname,
        role: userExist.role,
      }),
      data: {
          id: userExist._id,
          name: userExist.name,
          lastname: userExist.lastname,
          role: userExist.role,
        },
    };
  } catch (error) {
    console.log(error);
  }
};

//Function to forgot password
const forgotPassword = async (email) => {
  try {
    //Search user
    const userExist = await User.findOne({ email });

    //Validate user
    if (!userExist) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = { login, forgotPassword, renew };
