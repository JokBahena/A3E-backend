const { cloudinary } = require("../../config/cloudinary-config");
const path = require("path");

//Function to delete image
const deleteImage = async (link) => {
  try {
    //Get filename, type and name
    const filename = link.substring(link.lastIndexOf("/") + 1);
    const type = path.extname(filename);
    const name = filename.replace(type, "");

    //Delete image
    const result = await cloudinary.uploader.destroy(`banners/${name}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = {
  deleteImage,
};
