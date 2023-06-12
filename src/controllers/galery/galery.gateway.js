const Galery = require("../../models/galery");
const { uploadMultimedia } = require("../../utils/cloudinary/upload");

//Save multimedia
const save = async (multimediaPath, multimediaName) => {
  try {
    //If missing fields
    if (!multimediaPath) return { msg: "Missing fields" };

    //Call function to upload multimedia
    const multimediaUrl = await uploadMultimedia(multimediaPath, multimediaName, "galery");

    //If multimedia upload fails
    if (!multimediaUrl) {
      return { msg: "Error uploading multimedia" };
    } else {
      //Create multimedia
      const multimedia = new Galery({
        multimedia: multimediaUrl,
      });

      //Save multimedia
      return await multimedia.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
};
