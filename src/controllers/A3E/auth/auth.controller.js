const { Response, Router } = require("express");
const { login, forgotPassword } = require("./auth.gateway");
const { transporter, template } = require("../../../utils/email-service");
require("dotenv").config();
const { isTokenExp } = require("../../../config/jwt");

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

//Function to forgot password
const lostPassword = async (req, res = Response) => {
  try {
    //Extract data from body
    const { email } = req.body;

    //Call function to forgot password
    if (await forgotPassword(email)) {
      //Send email
      await transporter.sendMail({
        from: `A3E ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Olvide mi contraseña",
        html: template(),
      });
      return res.json({ msg: "Email sent" });
    } else {
      return res.status(400).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    //Error to send email
    console.log(error);
    res.status(400).json({
      msg: "Error to send email",
    });
  }
};

//Function to check if token is expired
const isTokenExpired = async (req, res = Response) => {
  try {
    //Obtain token
    const result = await isTokenExp(req.headers.authorization.split(" ")[1]);
    if (result) {
      //Token expired
      return res.status(400).json({
        msg: "Token expired",
      });
    } else {
      //Token valid
      return res.status(200).json({
        msg: "Token valid",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error to verify token",
    });
  }
};

//Route to signin
const authRouter = Router();

//Define route
authRouter.post("/signin", [], signin);
authRouter.post("/forgot-password", [], lostPassword);
authRouter.get("/verify-token", [], isTokenExpired);

//Export route
module.exports = { authRouter };
