const { Response, Router } = require("express");
const {
  save,
  findAll,
  findById,
  changeStatus,
  deleteById,
} = require("./vacancie.gateway");
const { uploadFile } = require("../../../../config/multer-config");
const {
  validationRecaptcha,
} = require("../../../../utils/validation-recaptcha");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const {
      fullName,
      phone,
      email,
      age,
      residence,
      education,
      position,
      source,
      tokenRecaptcha,
    } = req.body;

    //Validate recaptcha
    const responseRecaptcha = await validationRecaptcha(tokenRecaptcha);
    console.log(responseRecaptcha);

    //If recaptcha is not valid
    if (!responseRecaptcha.success)
      return res.status(400).json({ msg: "Recaptcha is not valid" });

    // Get the file path
    const curriculumPath = req.file.path;

    //Call function to save data
    const vacancie = await save(
      fullName,
      phone,
      email,
      age,
      residence,
      education,
      position,
      source,
      curriculumPath
    );

    //If user exists
    if (vacancie.msg) return res.status(400).json({ msg: vacancie.msg });
    return res.status(200).json({ msg: "Vacancie saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving vacancie",
    });
  }
};

//Function to find all vacancie
const getAll = async (req, res = Response) => {
  try {
    //Call function to find all vacancie
    const vacancies = await findAll();

    //If user exists
    if (!vacancies) return res.status(400).json({ msg: "Vacancies not found" });

    return res.status(200).json({ vacancies });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error finding vacancie",
    });
  }
};

const getById = async (req, res = Response) => {
  try {
    const { id } = req.params;

    //Call function to find all vacancie
    const vacancie = await findById(id);

    //If user exists
    if (vacancie.msg) return res.status(400).json({ msg: vacancie.msg });
    return res.status(200).json({ vacancie });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error finding vacancie",
    });
  }
};

//Function to change vacancie status
const changeVacancieStatus = async (req, res = Response) => {
  try {
    const { id } = req.params;

    //Call function to change vacancie status
    const vacancie = await changeStatus(id);

    //If user exists
    if (vacancie.msg) return res.status(400).json({ msg: vacancie.msg });
    return res.status(200).json({ msg: "Vacancie status changed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error changing vacancie status",
    });
  }
};

const deleteVacancie = async (req, res = Response) => {
  try {
    const { id } = req.params;

    //Call function to change vacancie status
    const vacancie = await deleteById(id);

    //If user exists
    if (vacancie.msg) return res.status(400).json({ msg: vacancie.msg });
    return res.status(200).json({ msg: "Vacancie deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting vacancie",
    });
  }
};

//Route to save data
const vacancieRouter = Router();

//Define route
vacancieRouter.post(
  "/create-vacancie",
  uploadFile.single("curriculum"),
  saveAndFlush
);
vacancieRouter.get("/getAll-vacancies", [], getAll);
vacancieRouter.get("/getById-vacancie/:id", [], getById);
vacancieRouter.patch("/changeStatus-vacancie/:id", [], changeVacancieStatus);
vacancieRouter.delete("/deleteById-vacancie/:id", [], deleteVacancie);

//Export route
module.exports = { vacancieRouter };
