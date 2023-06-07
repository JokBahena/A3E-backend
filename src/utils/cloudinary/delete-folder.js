const { cloudinary } = require("../../config/cloudinary-config");

//Function to delete folder
const deleteFolder = async (nameFolder, files, multimedias) => {
  try {
    //Replace spaces with _
    const name = nameFolder.replace(/ /g, "_");

    //Delete files
    for (let i = 0; i < files.length; i++) {
      console.log("files[i]", files[i].file);
      const result = await cloudinary.uploader.destroy(
        `services/${name}/files/${name + "_file_" + i}`
      );
      console.log("result", result);
    }

    //Delete multimedias
    for (let i = 0; i < multimedias.length; i++) {
      //If multimedia is mp4
      if (multimedias[i].multimedia.includes("mp4")) {
        console.log("multimedias[i]", multimedias[i].multimedia);
        const result = await cloudinary.uploader.destroy(
          `services/${name}/multimedias/${name + "_multimedia_" + i}`,
          { resource_type: "video" }
        );
        console.log("result", result);

        //If multimedia is jpg, png or jpeg
      } else if (multimedias[i].multimedia.includes("jpg", "png", "jpeg")) {
        console.log("multimedias[i]", multimedias[i].multimedia);
        const result = await cloudinary.uploader.destroy(
          `services/${name}/multimedias/${name + "_multimedia_" + i}`,
          { resource_type: "image" }
        );
        console.log("result", result);
      }
    }

    //Delete folder
    const result = await cloudinary.api.delete_folder(`services/${name}`);
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = {
  deleteFolder,
};
