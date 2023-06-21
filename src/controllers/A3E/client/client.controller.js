const { Response, Router } = require("express");
const { save, findAll, deleteClient } = require("./client.gateway");
const { uploadFile } = require("../../../config/multer-config");

//Function to save and send data for client
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { name } = req.body;

    // Get the file path
    const imagePath = req.file.path;

    //Call function to save data
    const client = await save(name, imagePath);

    //If client exists
    if (client.msg) return res.status(400).json({ msg: client.msg });
    return res.status(200).json({ msg: "Client saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving client",
    });
  }
};

//Function to get all clients
const getAll = async (req, res = Response) => {
  try {
    //Call function to get all clients
    const clients = await findAll();

    //If clients exists
    if (!clients) return res.status(400).json({ msg: "Clients not found" });
    return res.status(200).json({ clients });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting clients",
    });
  }
};

const deleteClientById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to delete client
    const client = await deleteClient(id);

    //If client exists
    if (client.msg) return res.status(400).json({ msg: client.msg });
    return res.status(200).json({ msg: "Client deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting client",
    });
  }
};

//Router to save client
const clientRouter = Router();

//Define routes
clientRouter.post("/create-client", uploadFile.single("image"), saveAndFlush);
clientRouter.get("/getAll-clients", [], getAll);
clientRouter.delete("/deleteById-client/:id", deleteClientById);

//Export router
module.exports = { clientRouter };
