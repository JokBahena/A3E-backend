const { authRouter } = require("./A3E/auth/auth.controller");
const { userRouter } = require("./users/user.controller");
const { topicRouter } = require("./A3E/topic/topic.controller");
const {
  humanResourceRouter,
} = require("./A3E/human-resource/human-resource.controller");

//Export routes
module.exports = {
  authRouter,
  userRouter,
  topicRouter,
  humanResourceRouter,
};
