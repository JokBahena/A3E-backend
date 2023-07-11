const { hashPassword } = require("../../utils/password/password-bcrypt");
const { validatePassword } = require("../../utils/password/validate-password");
const User = require("../../models/user");

//Function to save and send data
const save = async (name, lastname, email, password, gender) => {
  try {
    //Validate fields
    if (!name || !lastname || !email || !password || !gender)
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
      gender,
    });

    //Save user
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to get user
const findById = async (id) => {
  try {
    //Find user by id
    const user = await User.findById(id);
    if (!user) return { msg: "User not found" };
    return user;
  } catch (error) {
    console.log(error);
  }
};

//Function to update user
const update = async (id, name, lastname, email, password) => {
  try {
    //Find user by id
    const user = await User.findById(id);

    //If user exists
    if (!user) return { msg: "User not found" };

    //Validate email
    const userExist = await User.findOne({ email });
    if (userExist && userExist._id != id) return { msg: "User already exists" };

    //Validate password
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return { msg: "Invalid password" };

    //Update user
    user.name = name;
    user.lastname = lastname;
    user.email = email;

    //Save user
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (id, password, newPassword) => {
  try {
    //Find user by id
    const user = await User.findById(id);

    //If user exists
    if (!user) return { msg: "User not found" };

    //Call function to validate password
    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return { msg: "Invalid password" };

    //Call function to hash password
    const hashedPassword = await hashPassword(newPassword);

    //Update user
    user.password = hashedPassword;

    //Save user
    return await user.save();
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = { save, findById, update, updatePassword };
