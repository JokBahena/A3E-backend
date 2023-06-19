const Galery = require("../../models/galery");
const { uploadMultimedia } = require("../../utils/cloudinary/upload");
const { deleteMultimedia } = require("../../utils/cloudinary/delete-multimedia");

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

    //If multimedia upload fails
    if (!multimediaUrl) return { msg: "Error uploading multimedia" };

    //Get type of multimedia
    const type = multimediaUrl.includes(".mp4") ? "video" : "image";

    //Create multimedia
    const galery = new Galery({
      multimedia: multimediaUrl,
      type: type,
    });

    //Save multimedia
    return await galery.save();
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

const deleteById = async (id) => {
  try {
    //Get multimedia
    const galery = await Galery.findById(id);

    //If multimedia exists
    if (!galery) return { msg: "Multimedia not found" };

    //Call function to delete multimedia
    const result = await deleteMultimedia(galery.multimedia, "galery");

    //If multimedia delete fails
    if (!result) return { msg: "Error deleting multimedia" };

    //Delete multimedia
    return await Galery.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
  deleteById,
};
