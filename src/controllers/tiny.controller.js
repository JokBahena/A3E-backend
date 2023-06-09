const { Response, Router } = require("express");
const { save } = require("./tiny.gateway");

//Function to save and send data for service
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { content } = req.body;

    //Call function to save data
    const pruebaTiny = await save(content);

    //If service exists
    if (pruebaTiny.msg) return res.status(400).json({ msg: pruebaTiny.msg });
    return res.status(200).json({ msg: "PruebaTiny saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving pruebaTiny",
    });
  }
};

//Create route
const tinyRouter = Router();

//Define routes
tinyRouter.post("/save", saveAndFlush);

//Export routes
module.exports = { tinyRouter };
