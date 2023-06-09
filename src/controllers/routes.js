const { authRouter } = require("./A3E/auth/auth.controller");
const { userRouter } = require("./users/user.controller");
const { topicRouter } = require("./A3E/topic/topic.controller");
const {
  vacancieRouter,
} = require("./A3E/human-resource/vacancie/vacancie.controller");
const {
  internRouter,
} = require("./A3E/human-resource/intern/intern.controller");
const {
  subscriptionRouter,
} = require("./A3E/subscription/subscription.controller");
const { bannerRouter } = require("./A3E/banner/banner.controller");
const { contactRouter } = require("./A3E/contact/contact.controller");
const { serviceRouter } = require("./A3E/service/service.controller");
const { saleRouter } = require("./sale/sale.controller");
const { tinyRouter } = require("./tiny.controller");

//Export routes
module.exports = {
  authRouter,
  userRouter,
  topicRouter,
  vacancieRouter,
  internRouter,
  subscriptionRouter,
  bannerRouter,
  contactRouter,
  serviceRouter,
  saleRouter,
  tinyRouter,
};
