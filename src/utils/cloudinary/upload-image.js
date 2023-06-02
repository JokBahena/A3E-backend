const { cloudinary } = require("../../config/cloudinary-config");

//Function to upload image
const uploadImage = async (imagePath, name) => {
  try {
    //Upload image
    const result = await cloudinary.uploader.upload(imagePath, {
      //Upload image to folder
      public_id: name,
      folder: "banners",
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  uploadImage,
};
