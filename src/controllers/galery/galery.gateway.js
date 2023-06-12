const Galery = require("../../models/galery");
const { uploadMultimedia } = require("../../utils/cloudinary/upload");

//Save multimedia
const save = async (multimediaPath, multimediaName) => {
  try {
    //If missing fields
    if (!multimediaPath) return { msg: "Missing fields" };

    //Call function to upload multimedia
    const multimediaUrl = await uploadMultimedia(
      multimediaPath,
      multimediaName,
      "galery"
    );

    //Get type of multimedia
    const type = multimediaUrl.includes(".mp4") ? "video" : "image";

    //If multimedia upload fails
    if (!multimediaUrl) {
      return { msg: "Error uploading multimedia" };
    } else {
      //Create multimedia
      const galery = new Galery({
        multimedia: multimediaUrl,
        type: type,
      });

      //Save multimedia
      return await galery.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Get all multimedia
const findAll = async () => {
  try {
    //Get all multimedia
    return await Galery.find();
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
};
