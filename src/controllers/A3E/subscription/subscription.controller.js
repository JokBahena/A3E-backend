const { Response, Router } = require("express");
const { save, desactivate } = require("./subscription.gateway");
const { transporter, template } = require("../../../utils/email-service");

const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { name, email } = req.body;

    //Call function to save data
    const subscription = await save(name, email);

    //If user exists
    if (subscription.msg) {
      return res.status(400).json({ msg: subscription.msg });
    } else {
      await transporter.sendMail({
        from: `A3E ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Suscripción a nuestro boletín",
        html: template(),
      });
      return res.status(200).json({ msg: "Subscription ready" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving subscription",
    });
  }
};

const desactivateSubscription = async (req, res = Response) => {
  try {
    //Extract data from body
    const { email } = req.body;

    //Call function to desactivate subscription
    const subscription = await desactivate(email);

    //If user exists
    if (subscription.msg) {
      return res.status(400).json({ msg: subscription.msg });
    } else {
      await transporter.sendMail({
        from: `A3E ${process.env.EMAIL_USER}`,
        to: email,
        subject: "Desactivación de suscripción",
        html: template(),
      });
      return res.status(200).json({ msg: "Subscription desactivated" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error desactivating subscription",
    });
  }
};

//Route to save data
const subscriptionRouter = Router();

//Define routes
subscriptionRouter.post("/subscribe", [], saveAndFlush);
subscriptionRouter.patch("/desactivate", [], desactivateSubscription);

//Export routes
module.exports = { subscriptionRouter };
