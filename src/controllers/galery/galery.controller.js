const { Response, Router } = require("express");
const { save } = require("./galery.gateway");
const { uploadFile } = require("../../config/multer-config");

//Function to save and send data for galery
const saveAndFlush = async (req, res = Response) => {
  try {
    // Get the file path
    const multimediaPath = req.file.path;

    // Get the file name
    const multimediaName = req.file.filename;

    //Call function to save data
    const multimedia = await save(multimediaPath, multimediaName);

    //If multimedia exists
    if (multimedia.msg) return res.status(400).json({ msg: multimedia.msg });
    return res.status(200).json({ msg: "Multimedia saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving multimedia",
    });
  }
};

//Create router
const galeryRouter = Router();

//Routes
galeryRouter.post("/save", uploadFile.single("multimedia"), saveAndFlush);

//Export router
module.exports = { galeryRouter };
