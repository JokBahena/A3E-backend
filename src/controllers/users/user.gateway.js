const { hashPassword } = require("../../utils/password/password-bcrypt");
const User = require("../../models/user");

//Function to save and send data
const save = async (name, lastname, email, password) => {
  try {
    //Validate fields
    if (!name || !lastname || !email || !password)
      return { msg: "Missing fields" };

    //Validate email
    const validDomain = email.endsWith("@a3e.com.mx");
    if (!validDomain)
      return {
        msg: "Invalid email domain. Only @a3e.com.mx domain is allowed.",
      };

    //If user exists
    const userExist = await User.findOne({ email });
    if (userExist) return { msg: "User already exists" };

    //Call function to hash password
    const hashedPassword = await hashPassword(password);

    //Create user
    const user = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
    });

    //Save user
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = { save };
