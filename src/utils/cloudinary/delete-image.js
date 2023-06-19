const { cloudinary } = require("../../config/cloudinary-config");

//Function to delete image
const deleteImage = async (nameImg) => {
  try {
    const nameWithUnderscore = nameImg.replace(/ /g, "_");
    //Delete image
    const result = await cloudinary.uploader.destroy(`banners/${nameWithUnderscore}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = {
  deleteImage,
};
