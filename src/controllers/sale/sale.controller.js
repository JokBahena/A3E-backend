const { Response, Router } = require("express");
const { save } = require("./sale.gateway");

//Function to save and send data for sale
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { fullName, email, phone, typeService, enterprise, address, info } =
      req.body;

    //Call function to save data
    const sale = await save(
      fullName,
      email,
      phone,
      typeService,
      enterprise,
      address,
      info
    );

    //If sale exists
    if (sale.msg) return res.status(400).json({ msg: sale.msg });
    return res.status(200).json({ msg: "Sale saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving sale",
    });
  }
};

//Create router
const saleRouter = Router();

//Define routes
saleRouter.post("/create-sale", [], saveAndFlush);

//Export router
module.exports = { saleRouter };