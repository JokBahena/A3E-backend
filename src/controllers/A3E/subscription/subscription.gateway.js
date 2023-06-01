const Subscription = require("../../../models/A3E/subscription");

//Function to save and send data for subscription
const save = async (name, email) => {
  try {
    //Validate fields
    if (!name || !email) return { msg: "Missing fields" };

    //If subscription exists
    const subscriptionExist = await Subscription.findOne({ email });
    if (subscriptionExist) return { msg: "You are subscribe :)" };

    //Create subscription
    const subscription = new Subscription({
      name: name,
      email: email,
    });

    //Save subscription
    return await subscription.save();
  } catch (error) {
    console.log(error);
  }
};

const desactivate = async (email) => {
  try {
    //Validate fields
    if (!email) return { msg: "Missing fields" };

    //If subscription exists
    const subscriptionExist = await Subscription.findOne({ email });
    if (!subscriptionExist) return { msg: "You are not subscribe" };

    //Desactivate subscription
    subscriptionExist.status = false;

    //Save subscription
    return await subscriptionExist.save();
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  desactivate,
};
