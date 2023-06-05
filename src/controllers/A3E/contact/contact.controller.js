const { Response, Router } = require("express");
const { save, findAll, findById } = require("./contact.gateway");

//Function to save and send data for contact
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { type, contact } = req.body;

    //Call function to save data
    const contactx = await save(type, contact);

    //If contact exists
    if (contactx.msg) return res.status(400).json({ msg: contactx.msg });
    return res.status(200).json({ msg: "Contact saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving contact",
    });
  }
};

//Function to get all contacts
const getAll = async (req, res = Response) => {
  try {
    //Call function to get all contacts
    const contacts = await findAll();

    //If contacts exists
    if (!contacts) return res.status(400).json({ msg: "Contacts not found" });
    return res.status(200).json({ contacts });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting contacts",
    });
  }
};

//Function to get contact by id
const getById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to get contact by id
    const contact = await findById(id);

    //If contact exists
    if (contact.msg) return res.status(400).json({ msg: contact.msg });
    return res.status(200).json({ contact });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting contact",
    });
  }
};

//Router data
const contactRouter = Router();

//Define routes
contactRouter.post("/create-contact", [], saveAndFlush);
contactRouter.get("/getAll-contacts", [], getAll);
contactRouter.get("/getById-contact/:id", [], getById);

//Export router
module.exports = { contactRouter };
