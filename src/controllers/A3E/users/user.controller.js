const { Response, Router } = require("express");
const { save } = require("./user.gateway");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { name, lastname, email, password } = req.body;

    //Call function to save data
    const user = await save(name, lastname, email, password);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving user",
    });
  }
};

//Route to save data
const userRouter = Router();

//Define route
userRouter.post("/createUser", [], saveAndFlush);

//Export route
module.exports = { userRouter };
