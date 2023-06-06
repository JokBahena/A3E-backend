const Banner = require("../../../models/A3E/banner");
const { uploadImage } = require("../../../utils/cloudinary/upload-image");
const { deleteImage } = require("../../../utils/cloudinary/delete-image");

//Function to save and send data for banner
const save = async (title, description, imagePath, link) => {
  try {
    //If banner exists
    const bannerExist = await Banner.findOne({ title });
    if (bannerExist) return { msg: "Banner already exists" };

    //Call function to upload image
    const imageUrl = await uploadImage(imagePath, title, "banners");

    //If image upload fails
    if (!imageUrl) {
      return { msg: "Error uploading image" };
    } else {
      //Create banner
      const banner = new Banner({
        title: title,
        description: description,
        image: imageUrl,
        link: link,
      });

      //Save banner
      return await banner.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Function to get all banners
const findAll = async () => {
  try {
    //Get all banners
    return await Banner.find().select("-_id title image");
  } catch (error) {
    console.log(error);
  }
};

//Function to get banner by id
const findById = async (id) => {
  try {
    //Get banner by id
    const banner = await Banner.findById(id).select(
      "-_id title description image link"
    );

    //If banner exists
    if (!banner) return { msg: "Banner not found" };
    return banner;
  } catch (error) {
    console.log(error);
  }
};

//Function to update banner
const update = async (id, title, description, imagePath, link) => {
  try {
    //Get banner by id
    const banner = await Banner.findById(id);

    //If banner exists
    if (!banner) return { msg: "Banner not found" };

    //If title is changed
    if (banner.title !== title) {
      await deleteImage(banner.title);
    }
    //Call function to upload image
    const imageUrl = await uploadImage(imagePath, title);

    //If image upload fails
    if (!imageUrl) {
      return { msg: "Error uploading image" };
    } else {
      //Update banner
      banner.title = title;
      banner.description = description;
      banner.image = imageUrl;
      banner.link = link;

      //Save banner
      return await banner.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
  findById,
  update,
};
