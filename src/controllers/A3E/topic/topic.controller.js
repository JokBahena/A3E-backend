const { Response, Router } = require("express");
const { save } = require("./topic.gateway");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { nameSection, topics } = req.body;

    //Call function to save data
    const topic = await save(nameSection, topics);

    //If topic exists
    if (topic.msg) return res.status(400).json({ msg: topic.msg });
    return res.status(200).json({ msg: "Topic saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving topic",
    });
  }
};

//Route to save data
const topicRouter = Router();

//Define route
topicRouter.post("/create-topic", [], saveAndFlush);

//Export route
module.exports = { topicRouter };
