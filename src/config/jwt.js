const jtw = require("jsonwebtoken");
require("dotenv").config();

//Function to generate token
const generateToken = (payload) => {
  return jtw.sign(payload, process.env.SECRET, { expiresIn: "5m" });
};

//Function to verify token
const verifyToken = async (token) => {
  try {
    //Verify token
    const decoded = jtw.verify(token, process.env.SECRET);
    //Return decoded
    return decoded;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//Function to check if token is expired
const isTokenExp = async (token) => {
  //Verify token
  const decoded = await verifyToken(token);

  //Validate token
  if (!decoded) return true;

  //Check time token
  await checkTimeToken(decoded);

  //Validate time token
  return false;
};

//Function to check time token
const checkTimeToken = async (payload) => {
  //Get time
  const now = Math.floor(Date.now() / 1000);

  //Get time token
  const time = payload.exp - now;

  //Show time
  const timeInMinutes = Math.floor(time / 60);
  console.log("timeInMinutes", timeInMinutes + "m" + (time % 60) + "s");
};

//Export function
module.exports = {
  generateToken,
  verifyToken,
  isTokenExp,
  checkTimeToken,
};
