const { Response, Router } = require("express");
const {
  save,
  findAll,
  findById,
  update,
  updatePassword,
  changeStatus,
  deleteUser,
} = require("./user.gateway");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { name, lastname, email, password, gender, role } = req.body;

    //Call function to save data
    const user = await save(name, lastname, email, password, gender, role);

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

//Function to get all users
const getAllUsers = async (req, res = Response) => {
  try {
    //Call function to get all users
    const users = await findAll();

    //If user exists
    if (!users) return res.status(400).json({ msg: "Users not found" });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting users",
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

//Function to change status
const changeStatusUser = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to change status
    const user = await changeStatus(id);

    //If user exists
    if (user.msg) return res.status(400).json({ msg: user.msg });
    return res.status(200).json({ msg: "Status changed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error changing status",
    });
  }
};

//Function to delete user
const deleteUserById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to delete user
    const user = await deleteUser(id);

    //If user exists
    if (user.msg) return res.status(400).json({ msg: user.msg });
    return res.status(200).json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting user",
    });
  }
};

//Route to save data
const userRouter = Router();

//Define route
userRouter.post("/create-user", [], saveAndFlush);
userRouter.get("/getAll-users", [], getAllUsers);
userRouter.get("/getById-user/:id", [], getUser);
userRouter.put("/updateById-user/:id", [], updateUser);
userRouter.patch("/updatePasswordById-user/:id", [], updatePasswordUser);
userRouter.patch("/changeStatusById-user/:id", [], changeStatusUser);
userRouter.delete("/deleteById-user/:id", [], deleteUserById);

//Export route
module.exports = { userRouter };
