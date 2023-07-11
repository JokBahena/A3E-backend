const { Response, Router } = require("express");
const { save, findById, update, updatePassword } = require("./user.gateway");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { name, lastname, email, password, gender } = req.body;

    //Call function to save data
    const user = await save(name, lastname, email, password, gender);

    //If user exists
    if (user.msg) return res.status(400).json({ msg: user.msg });
    return res.status(200).json({ msg: "User saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving user",
    });
  }
};

//Function to get user
const getUser = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to get user
    const user = await findById(id);

    //If user exists
    if (user.msg) return res.status(400).json({ msg: user.msg });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting user",
    });
  }
};

//Function to update user
const updateUser = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Extract data from body
    const { name, lastname, email, password } = req.body;

    //Call function to update user
    const user = await update(id, name, lastname, email, password);

    //If user exists
    if (user.msg) return res.status(400).json({ msg: user.msg });
    return res.status(200).json({ msg: "User updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error updating user",
    });
  }
};

//Function to update password
const updatePasswordUser = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Extract data from body
    const { password, newPassword } = req.body;

    //Call function to update password
    const user = await updatePassword(id, password, newPassword);

    //If user exists
    if (user.msg) return res.status(400).json({ msg: user.msg });
    return res.status(200).json({ msg: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error updating password",
    });
  }
};

//Route to save data
const userRouter = Router();

//Define route
userRouter.post("/create-user", [], saveAndFlush);
userRouter.get("/getById-user/:id", [], getUser);
userRouter.put("/updateById-user/:id", [], updateUser);
userRouter.patch("/updatePasswordById-user/:id", [], updatePasswordUser);

//Export route
module.exports = { userRouter };
