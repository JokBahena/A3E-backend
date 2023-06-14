const Service = require("../../../models/A3E/service");

//Function to save and send data for service
const save = async (title, content) => {
  try {
    //If missing fields
    if (!title) return { msg: "Title is required" };

    //If service exists
    const serviceExist = await Service.findOne({ title });
    if (serviceExist) return { msg: "Service already exists" };

    //Create service
    const service = new Service({
      title: title,
      content: content,
    });

    //Save service
    return await service.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to find all services
const findAll = async () => {
  try {
    //Find all services
    return await Service.find();
  } catch (error) {
    console.log(error);
  }
};

//Function to find service by id
const findById = async (id) => {
  try {
    //Find service by id
    const service = await Service.findById(id);
    if (!service) return { msg: "Service not found" };
    return service;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, title, files, info, multimedias) => {
  try {
    let urls = [];

    //If missing fields
    if (!title) return { msg: "Title is required" };

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
