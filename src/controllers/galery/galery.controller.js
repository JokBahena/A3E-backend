const { Response, Router } = require("express");
const { save, findAll, deleteById } = require("./galery.gateway");
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

//Function to get all multimedia
const getAll = async (req, res = Response) => {
  try {
    //Call function to get all multimedia
    const multimedia = await findAll();

    //If multimedia exists
    if (!multimedia)
      return res.status(400).json({ msg: "Multimedia not found" });
    return res.status(200).json({ multimedia });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting multimedia",
    });
  }
};

const deleteMultimedia = async (req, res = Response) => {
  try {
    //Get id
    const { id } = req.params;

    //Call function to delete multimedia
    const result = await deleteById(id);

    //If multimedia exists
    if (result.msg) return res.status(400).json({ msg: result.msg });
    return res.status(200).json({ msg: "Multimedia deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting multimedia",
    });
  }
};

//Create router
const galeryRouter = Router();

//Routes
galeryRouter.post("/save", uploadFile.single("multimedia"), saveAndFlush);
galeryRouter.get("/getAll-galery", [], getAll);
galeryRouter.delete("/delete/:id", [], deleteMultimedia);

//Export router
module.exports = { galeryRouter };
