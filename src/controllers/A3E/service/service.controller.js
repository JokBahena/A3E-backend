const { Respone, Router } = require("express");
const { save } = require("./service.gateway");
const { upload } = require("../../../config/multer-config");

//Function to save and send data for service
const saveAndFlush = async (req, res = Response) => {
  try {
    let files = [];
    let multimedias = [];
    let filesPath = [];
    let multimediasPath = [];
    let infoArray = [];
    //Extract data from body
    const { title, info } = req.body;

    //Get files and multimedias
    if (req.files && req.files["files"]) {
      files = req.files["files"];
    }

    if (req.files && req.files["multimedias"]) {
      multimedias = req.files["multimedias"];
    }

    //Create array with info
    if (info) {
      if (typeof info === "string") {
        infoArray.push({ text: info });
      } else if (Array.isArray(info)) {
        infoArray = info.map((info) => ({ text: info }));
      }
    }

    // Get the file path
    if (files) {
      filesPath = files.map((file) => file.path);
    }

    if (multimedias) {
      multimediasPath = multimedias.map((multimedia) => multimedia.path);
    }

    //Call function to save data
    const service = await save(title, filesPath, infoArray, multimediasPath);

    //If service exists
    if (service.msg) return res.status(400).json({ msg: service.msg });
    return res.status(200).json({ msg: "Service saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving service",
    });
  }
};

//Create router
const serviceRouter = Router();

//Define routes
serviceRouter.post(
  "/create-service",
  upload.fields([{ name: "files" }, { name: "multimedias" }]),
  saveAndFlush
);

//Export router
module.exports = { serviceRouter };
