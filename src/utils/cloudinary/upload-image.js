const { cloudinary } = require("../../config/cloudinary-config");

//Function to upload image
const uploadImage = async (filePath, name, folder) => {
  try {
    switch (folder) {
      case "banners":
        //Upload image
        const result = await cloudinary.uploader.upload(filePath, {
          //Upload image to folder
          public_id: name,
          folder: folder,
        });
        return result.secure_url;

      case "services":
        let filesUrl = [];
        let multimediasUrl = [];
        //Upload files
        for (const key in filePath[0]) {
          if (key !== "type") {
            const result = await cloudinary.uploader.upload(filePath[0][key], {
              //Upload image to folder
              public_id: `${name}-file-${key}`,
              folder: folder + "/files/" + name,
            });
            filesUrl.push(result.secure_url);
          }
        }
        //Upload multimedias
        for (const key in filePath[1]) {
          if (key !== "type") {
            const result = await cloudinary.uploader.upload(filePath[1][key], {
              //Upload image to folder
              public_id: `${name}-multimedia-${key}`,
              folder: folder + "/multimedias/" + name,
            });
            multimediasUrl.push(result.secure_url);
          }
        }
        return { filesUrl, multimediasUrl };
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  uploadImage,
};
