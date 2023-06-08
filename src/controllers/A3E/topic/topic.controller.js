const { Response, Router } = require("express");
const { save, findAll, findById } = require("./topic.gateway");
const { upload } = require("../../../config/multer-config");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    let topics = [];
    let multimedias = [];
    let multimediasPath = [];
    //Extract data from body
    const { nameSection, nameTopic, description } = req.body;

    console.log("nameSection: ", nameSection);
    console.log("nameTopic: ", nameTopic);
    console.log("description: ", description);

    //Get multimedias
    if (req.files && req.files["multimedias"]) {
      multimedias = req.files["multimedias"];
    }

    // Get the file path
    if (multimedias) {
      multimediasPath = multimedias.map((multimedia) => multimedia.path);
    }

    //Create array with nameTopic, description and multimedias
    if (nameTopic || description) {
      if (typeof nameTopic === "string" && typeof description === "string") {
        topics.push({ nameTopic, description, multimediasPath });
      } else if (Array.isArray(nameTopic) || Array.isArray(description)) {
        topics = nameTopic.map((nameTopic, index) => ({
          nameTopic,
          description: description[index],
          multimediasPath,
        }));
      }
    }

    console.log("multimediasPath: ", multimediasPath);
    console.log("topics: ", topics);

    //Call function to save data
    // const topic = await save(nameSection, topics);

    //If topic exists
    // if (topic.msg) return res.status(400).json({ msg: topic.msg });
    // return res.status(200).json({ msg: "Topic saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving topic",
    });
  }
};

//Function to get all topics
const getAll = async (req, res = Response) => {
  try {
    //Call function to get all topics
    const topics = await findAll();

    //If topics exists
    if (!topics) return res.status(400).json({ msg: "Topics not found" });
    return res.status(200).json({ topics });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting topics",
    });
  }
};

//Function to get topic by id
const getById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to get topic by id
    const topic = await findById(id);

    //If topic exists
    if (topic.msg) return res.status(400).json({ msg: topic.msg });
    return res.status(200).json({ topic });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting topic",
    });
  }
};

//Route to save data
const topicRouter = Router();

//Define route
topicRouter.post(
  "/create-topic",
  upload.fields([
    {
      name: "multimedias",
    },
  ]),
  saveAndFlush
);
topicRouter.get("/getAll-topics", [], getAll);
topicRouter.get("/getById-topic/:id", [], getById);

//Export route
module.exports = { topicRouter };
