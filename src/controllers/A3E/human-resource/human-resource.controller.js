const { Response, Router } = require("express");
const { saveVacancie, findAllVacancie } = require("./human-resource.gateway");
const { saveIntern, findAllIntern } = require("./human-resource.gateway");

//Function to save and send data
const saveAndFlushVacancie = async (req, res = Response) => {
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
    const vacancie = await saveVacancie(
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
const getAllVacancie = async (req, res = Response) => {
  try {
    //Call function to find all vacancie
    const vacancie = await findAllVacancie();

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

////////////////////////////////////////////////////Intern/////////////////////////////////////

const saveAndFlushIntern = async (req, res = Response) => {
  try {
    //Extract data from body
    const {
      fullName,
      email,
      phone,
      age,
      institution,
      typePeriod,
      typePractice,
      degree,
      source,
      info,
    } = req.body;

    //Call function to save data
    const intern = await saveIntern(
      fullName,
      email,
      phone,
      age,
      institution,
      typePeriod,
      typePractice,
      degree,
      source,
      info
    );

    //If user exists
    if (intern.msg) return res.status(400).json({ msg: intern.msg });
    return res.status(200).json({ msg: "Intern saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving intern",
    });
  }
};

//Function to find all intern
const getAllIntern = async (req, res = Response) => {
  try {
    //Call function to find all intern
    const intern = await findAllIntern();

    //If user exists
    if (!intern) return res.status(400).json({ msg: "Intern not found" });

    return res.status(200).json({ intern });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error finding intern",
    });
  }
};

//Route to save data
const humanResourceRouter = Router();

//Define route
//Vacancie
humanResourceRouter.post("/create-vacancie", [], saveAndFlushVacancie);
humanResourceRouter.get("/getAll-vacancie", [], getAllVacancie);

//Intern
humanResourceRouter.post("/create-intern", [], saveAndFlushIntern);
humanResourceRouter.get("/getAll-intern", [], getAllIntern);

//Export route
module.exports = { humanResourceRouter };
