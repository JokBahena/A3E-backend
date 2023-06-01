const { authRouter } = require("./A3E/auth/auth.controller");
const { userRouter } = require("./users/user.controller");
const { topicRouter } = require("./A3E/topic/topic.controller");
const {
  vacancieRouter,
} = require("./A3E/human-resource/vacancie/vacancie.controller");
const {
  internRouter,
} = require("./A3E/human-resource/intern/intern.controller");

//Export routes
module.exports = {
  authRouter,
  userRouter,
  topicRouter,
  vacancieRouter,
  internRouter,
};
