const { cloudinary } = require("../../config/cloudinary-config");
const path = require("path");

//Function to delete image
const deleteImage = async (link, folder) => {
  try {
    switch (folder) {
      case "clients":
        //Get filename, type and name
        const filename2 = link.substring(link.lastIndexOf("/") + 1);
        const type2 = path.extname(filename2);
        const name2 = filename2.replace(type2, "");
        
        //Delete image
        const result2 = await cloudinary.uploader.destroy(`${folder}/${name2}`);
        return result2;

      case "banners":
        //Get filename, type and name
        const filename = link.substring(link.lastIndexOf("/") + 1);
        const type = path.extname(filename);
        const name = filename.replace(type, "");

        //Delete image
        const result = await cloudinary.uploader.destroy(`${folder}/${name}`);
        return result;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = {
  deleteImage,
};
