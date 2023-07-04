const { Response, Router } = require("express");
const { save, findAll, findById } = require("./intern.gateway");

const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const {
      fullName,
      phone,
      email,
      age,
      institution,
      typePractice,
      degree,
      period,
      info,
    } = req.body;

    //Call function to save data
    const intern = await save(
      fullName,
      phone,
      email,
      age,
      institution,
      typePractice,
      degree,
      period,
      info,
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
const getAll = async (req, res = Response) => {
  try {
    //Call function to find all intern
    const interns = await findAll();

    //If user exists
    if (!interns) return res.status(400).json({ msg: "Intern not found" });
    return res.status(200).json({ interns });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error finding intern",
    });
  }
};

//Function to find intern by id
const getById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to find intern by id
    const intern = await findById(id);

    //If user exists
    if (intern.msg) return res.status(400).json({ msg: intern.msg });
    return res.status(200).json({ intern });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error finding intern",
    });
  }
};

//Route to save data
const internRouter = Router();

//Define route
internRouter.post("/create-intern", [], saveAndFlush);
internRouter.get("/getAll-interns", [], getAll);
internRouter.get("/getById-intern/:id", [], getById);

//Export route
module.exports = { internRouter };
