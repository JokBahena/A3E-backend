const { cloudinary } = require("../../config/cloudinary-config");

//Function to delete image
const deleteImage = async (nameImg) => {
  try {
    //Delete image
    const result = await cloudinary.uploader.destroy(`banners/${nameImg}`);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = {
  deleteImage,
};
