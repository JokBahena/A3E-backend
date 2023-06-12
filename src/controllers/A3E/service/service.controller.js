const { Respone, Router } = require("express");
const { save, findAll, findById, update } = require("./service.gateway");
const { uploadFile } = require("../../../config/multer-config");

//Function to save and send data for service
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { title, content } = req.body;

    //Call function to save data
    const service = await save(title, content);

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

//Function to get all services
const getAll = async (req, res = Response) => {
  try {
    //Call function to get all services
    const services = await findAll();

    //If services exists
    if (!services) return res.status(400).json({ msg: "Services not found" });
    return res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting services",
    });
  }
};

//Function to get service by id
const getById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to get service by id
    const service = await findById(id);

    //If service exists
    if (service.msg) return res.status(400).json({ msg: service.msg });
    return res.status(200).json({ service });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting service",
    });
  }
};

//Function to update service
const updateById = async (req, res = Response) => {
  try {
    let files = [];
    let multimedias = [];
    let filesPath = [];
    let multimediasPath = [];
    let infoArray = [];

    //Extract id from params
    const { id } = req.params;

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

    //Call function to update service
    const service = await update(
      id,
      title,
      filesPath,
      infoArray,
      multimediasPath
    );

    //If service exists
    if (service.msg) return res.status(400).json({ msg: service.msg });
    return res.status(200).json({ msg: "Service updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error updating service",
    });
  }
};

//Create router
const serviceRouter = Router();

//Define routes
serviceRouter.post(
  "/create-service",
  uploadFile.fields([{ name: "files" }, { name: "multimedias" }]),
  saveAndFlush
);
serviceRouter.get("/getAll-services", [], getAll);
serviceRouter.get("/getById-service/:id", [], getById);
serviceRouter.put(
  "/updateById-service/:id",
  uploadFile.fields([{ name: "files" }, { name: "multimedias" }]),
  updateById
);

//Export router
module.exports = { serviceRouter };
