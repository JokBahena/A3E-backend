const Service = require("../../../models/A3E/service");
const { uploadImage } = require("../../../utils/cloudinary/upload-image");
const { deleteFolder } = require("../../../utils/cloudinary/delete-folder");

//Function to save and send data for service
const save = async (title, files, info, multimedias) => {
  try {
    let urls = [];
    //If service exists
    const serviceExist = await Service.findOne({ title });
    if (serviceExist) return { msg: "Service already exists" };

    //Create array with files and multimedias
    urls = [
      { type: "files", ...files },
      { type: "multimedias", ...multimedias },
    ];

    //Call function to upload image
    const { filesUrl, multimediasUrl } = await uploadImage(
      urls,
      title,
      "services"
    );

    //If image upload fails
    if (!filesUrl || !multimediasUrl) {
      return { msg: "Error uploading files or multimedias" };
    } else {
      //Create arrays
      const filesArray = filesUrl.map((fileUrl) => ({ file: fileUrl }));
      const multimediasArray = multimediasUrl.map((multimediaUrl) => ({
        multimedia: multimediaUrl,
      }));
      //Create service
      const service = new Service({
        title: title,
        files: filesArray,
        info: info,
        multimedias: multimediasArray,
      });

      //Save service
      return await service.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Function to find all services
const findAll = async () => {
  try {
    //Find all services
    return await Service.find()
      .select("-_id title")
      .populate("files.file", "-_id file")
      .populate("info.text", "-_id text")
      .populate("multimedias.multimedia", "-_id multimedia");
  } catch (error) {
    console.log(error);
  }
};

//Function to find service by id
const findById = async (id) => {
  try {
    //Find service by id
    const service = await Service.findById(id)
      .select("-_id title")
      .populate("files.file", "-_id file")
      .populate("info.text", "-_id text")
      .populate("multimedias.multimedia", "-_id multimedia");

    //If service exists
    if (!service) return { msg: "Service not found" };
    return service;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, title, files, info, multimedias) => {
  try {
    let urls = [];
    //If service exists
    const service = await Service.findById(id);
    if (!service) return { msg: "Service not found" };

    //Check if title is already in use
    const serviceExist = await Service.findOne({ title });
    if (serviceExist) return { msg: "Service already exists" };

    //Create array with files and multimedias
    urls = [
      { type: "files", ...files },
      { type: "multimedias", ...multimedias },
    ];

    //Delete files and multimedias
    const result = await deleteFolder(
      service.title,
      service.files,
      service.multimedias
    );
    if (!result) return { msg: "Error deleting files or multimedias" };

    //Call function to upload image
    const { filesUrl, multimediasUrl } = await uploadImage(
      urls,
      title,
      "services"
    );

    //If image upload fails
    if (!filesUrl || !multimediasUrl) {
      return { msg: "Error uploading files or multimedias" };
    } else {
      //Create arrays
      const filesArray = filesUrl.map((fileUrl) => ({ file: fileUrl }));
      const multimediasArray = multimediasUrl.map((multimediaUrl) => ({
        multimedia: multimediaUrl,
      }));
      //Create service
      service.title = title;
      service.files = filesArray;
      service.info = info;
      service.multimedias = multimediasArray;

      //Save service
      return await service.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
  findById,
  update,
};
