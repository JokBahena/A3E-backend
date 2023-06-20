const { cloudinary } = require("../../config/cloudinary-config");
const path = require("path");

//Function to upload image
const uploadMultimedia = async (filePath, name, folder) => {
  try {
    //Which folder
    switch (folder) {
      case "banners":
        let nameWithUnderscore = name.replace(/ /g, "_");
        let nameWithoutSigns = nameWithUnderscore.replace(/[!¡?¿,.-]/g, "x");
        let stringWithoutAccents = nameWithoutSigns
          .replace(/[áÁ]/g, "a")
          .replace(/[éÉ]/g, "e")
          .replace(/[íÍ]/g, "i")
          .replace(/[óÓ]/g, "o")
          .replace(/[úÚ]/g, "u");

        //Upload image
        const result = await cloudinary.uploader.upload(filePath, {
          //Upload image to folder
          resource_type: "image",
          public_id: stringWithoutAccents,
          folder: folder,
        });

        //Return url
        return result.secure_url;

      case "galery":
        let fileExtension = path.extname(filePath);
        let nameWithUnderscore2 = name.replace(/ /g, "_");
        let nameWithoutExtension = nameWithUnderscore2.replace(
          fileExtension,
          ""
        );

        //Upload multimedia
        if (fileExtension === ".mp4") {
          const result = await cloudinary.uploader.upload(filePath, {
            //Upload video to folder
            resource_type: "video",
            public_id: nameWithoutExtension,
            folder: folder,
          });
          return result.secure_url;
        } else if (
          fileExtension === ".jpg" ||
          fileExtension === ".jpeg" ||
          fileExtension === ".png"
        ) {
          const result = await cloudinary.uploader.upload(filePath, {
            //Upload image to folder
            resource_type: "image",
            public_id: nameWithoutExtension,
            folder: folder,
          });
          return result.secure_url;
        } else {
          return null;
        }

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  uploadMultimedia,
};
