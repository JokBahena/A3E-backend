const { authRouter } = require("./A3E/auth/auth.controller");
const { userRouter } = require("./A3E/users/user.controller");

//Export routes
module.exports = {
  authRouter,
  userRouter,
};
