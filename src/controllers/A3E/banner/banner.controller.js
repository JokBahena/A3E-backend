const { Response, Router } = require("express");
const {
  save,
  findAll,
  findById,
  update,
  updateStatus,
  deleteBanner,
} = require("./banner.gateway");
const { uploadFile } = require("../../../config/multer-config");

//Function to save and send data for banner
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { title, description, link } = req.body;

    // Get the file path
    const imagePath = req.file.path;

    //Call function to save data
    const banner = await save(title, description, imagePath, link);

    //If banner exists
    if (banner.msg) return res.status(400).json({ msg: banner.msg });
    return res.status(200).json({ msg: "Banner saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving banner",
    });
  }
};

//Function to get all banners
const getAll = async (req, res = Response) => {
  try {
    //Call function to get all banners
    const banners = await findAll();

    //If banners exists
    if (!banners) return res.status(400).json({ msg: "Banners not found" });
    return res.status(200).json({ banners });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting banners",
    });
  }
};

//Function to get banner by id
const getById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to get banner by id
    const banner = await findById(id);

    //If banner exists
    if (banner.msg) return res.status(400).json({ msg: banner.msg });
    return res.status(200).json({ banner });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting banner",
    });
  }
};

//Function to update banner
const updateById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Extract data from body
    const { title, description, link } = req.body;

    // Get the file path
    const imagePath = req.file ? req.file.path : null;

    //Call function to update banner
    const banner = await update(id, title, description, imagePath, link);

    //If banner exists
    if (banner.msg) return res.status(400).json({ msg: banner.msg });
    return res.status(200).json({ msg: "Banner updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error updating banner",
    });
  }
};

//Function to update banner status
const updateStatusById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to update banner status
    const banner = await updateStatus(id);

    //If banner exists
    if (banner.msg) return res.status(400).json({ msg: banner.msg });
    return res.status(200).json({ msg: "Banner status updated" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error updating banner status",
    });
  }
};

//Function to delete banner
const deleteById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to delete banner
    const banner = await deleteBanner(id);

    //If banner exists
    if (banner.msg) return res.status(400).json({ msg: banner.msg });

    return res.status(200).json({ msg: "Banner deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting banner",
    });
  }
};

//Route to save data
const bannerRouter = Router();

//Define routes
bannerRouter.post("/create-banner", uploadFile.single("image"), saveAndFlush);
bannerRouter.get("/getAll-banners", [], getAll);
bannerRouter.get("/getById-banner/:id", [], getById);
bannerRouter.put(
  "/updateById-banner/:id",
  uploadFile.single("image"),
  updateById
);
bannerRouter.patch("/updateStatus-banner/:id", [], updateStatusById);
bannerRouter.delete("/deleteById-banner/:id", [], deleteById);

//Export routes
module.exports = { bannerRouter };
