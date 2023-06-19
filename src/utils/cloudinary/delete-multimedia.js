const { cloudinary } = require("../../config/cloudinary-config");
const path = require("path");

//Function to delete image
const deleteMultimedia = async (link) => {
  try {
    const filename = link.substring(link.lastIndexOf("/") + 1);
    const type = path.extname(filename);
    const name = filename.replace(type, "");

    //If video
    if (type === ".mp4") {
      //Delete video
      const result = await cloudinary.uploader.destroy(`galery/${name}`, {
        resource_type: "video",
      });
      return result;
    } else if (type === ".jpg" || type === ".jpeg" || type === ".png") {
      //Delete image
      const result = await cloudinary.uploader.destroy(`galery/${name}`, {
        resource_type: "image",
      });
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = {
  deleteMultimedia,
};
