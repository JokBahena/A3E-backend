const { cloudinary } = require("../../config/cloudinary-config");
const path = require("path");

//Function to upload image
const uploadImage = async (filePath, name, folder) => {
  try {
    switch (folder) {
      case "banners":
        let namex = name.replace(/ /g, "_");
        //Upload image
        const result = await cloudinary.uploader.upload(filePath, {
          //Upload image to folder
          resource_type: "image",
          public_id: namex,
          folder: folder,
        });
        return result.secure_url;

      case "services":
        let filesUrl = [];
        let multimediasUrl = [];

        //Upload files
        for (const key in filePath[0]) {
          if (key !== "type") {
            let namex = name.replace(/ /g, "_");
            const result = await cloudinary.uploader.upload(filePath[0][key], {
              //Upload image to folder
              resource_type: "auto",
              public_id: `${namex}_file_${key}`,
              folder: folder + "/" + namex + "/files",
            });
            filesUrl.push(result.secure_url);
          }
        }
        //Upload multimedias
        for (const key in filePath[1]) {
          if (key !== "type") {
            let namex = name.replace(/ /g, "_");
            //Get file extension
            let fileExtension = path.extname(filePath[1][key]);

            //Upload multimedia
            if (fileExtension === ".mp4") {
              const result = await cloudinary.uploader.upload(
                filePath[1][key],
                {
                  //Upload video to folder
                  resource_type: "video",
                  public_id: `${namex}_multimedia_${key}`,
                  folder: folder + "/" + namex + "/multimedias",
                }
              );
              multimediasUrl.push(result.secure_url);
            }

            //Upload multimedia
            if (
              fileExtension === ".jpg" ||
              fileExtension === ".jpeg" ||
              fileExtension === ".png"
            ) {
              const result = await cloudinary.uploader.upload(
                filePath[1][key],
                {
                  //Upload image to folder
                  resource_type: "image",
                  public_id: `${namex}_multimedia_${key}`,
                  folder: folder + "/" + namex + "/multimedias",
                }
              );
              multimediasUrl.push(result.secure_url);
            }
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
