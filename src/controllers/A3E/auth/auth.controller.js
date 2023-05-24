const { Response, Router } = require("express");
const { login } = require("./auth.gateway");

//Function to signin
const signin = async (req, res = Response) => {
  try {
    //Extract data from body
    const { email, password } = req.body;

    //Call function to login
    const token = await login(email, password);
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error signing in",
    });
  }
};

//Route to signin
const authRouter = Router();

//Define route
authRouter.post("/signin", [], signin);

//Export route
module.exports = { authRouter };
