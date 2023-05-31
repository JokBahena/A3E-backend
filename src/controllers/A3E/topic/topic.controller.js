const { Response, Router } = require("express");
const { save } = require("./topic.gateway");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { section } = req.body;

    //Call function to save data
    const topic = await save(section);

    //Send response
    if (!topic) {
      res.status(200).json({ msg: "Section saved" });
    } else {
      res.status(400).json({ msg: topic.msg });
    }
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
