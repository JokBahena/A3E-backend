const { authRouter } = require("./A3E/auth/auth.controller");
const { userRouter } = require("./A3E/users/user.controller");

// Exportar rutas
module.exports = {
  authRouter,
  userRouter,
};
