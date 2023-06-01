const { Response, Router } = require("express");
const { save, findAll, findById } = require("./vacancie.gateway");

//Function to save and send data
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const {
      fullName,
      email,
      phone,
      age,
      address,
      education,
      position,
      source,
      curriculum,
    } = req.body;

    //Call function to save data
    const vacancie = await save(
      fullName,
      email,
      phone,
      age,
      address,
      education,
      position,
      source,
      curriculum
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
    const vacancie = await findAll();

    //If user exists
    if (!vacancie) return res.status(400).json({ msg: "Vacancies not found" });

    return res.status(200).json({ vacancie });
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

//Route to save data
const vacancieRouter = Router();

//Define route
vacancieRouter.post("/create-vacancie", [], saveAndFlush);
vacancieRouter.get("/getAll-vacancie", [], getAll);
vacancieRouter.get("/getById-vacancie/:id", [], getById);

//Export route
module.exports = { vacancieRouter };
