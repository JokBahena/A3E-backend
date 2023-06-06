const Service = require("../../../models/A3E/service");
const { uploadImage } = require("../../../utils/cloudinary/upload-image");

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

//Export functions
module.exports = {
  save,
};
