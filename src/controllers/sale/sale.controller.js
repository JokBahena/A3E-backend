const { Response, Router } = require("express");
const { save, findAll, changeStatus, deleteSale } = require("./sale.gateway");

//Function to save and send data for sale
const saveAndFlush = async (req, res = Response) => {
  try {
    //Extract data from body
    const { fullName, phone, email, typeService, enterprise, address, info } =
      req.body;

    //Call function to save data
    const sale = await save(
      fullName,
      phone,
      email,
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

//Function to get all sales
const getAllSales = async (req, res = Response) => {
  try {
    //Call function to get all sales
    const sales = await findAll();

    //If sales not found
    if (!sales) return res.status(400).json({ msg: "Sales not found" });

    //Send sales
    return res.status(200).json({ sales });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting sales",
    });
  }
};

//Function to change sale status
const changeSaleStatus = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to change sale status
    const sale = await changeStatus(id);

    //If sale not found
    if (sale.msg) return res.status(400).json({ msg: sale.msg });
    return res.status(200).json({ msg: "Sale status changed" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error changing sale status",
    });
  }
};

//Function to delete sale
const deleteSaleById = async (req, res = Response) => {
  try {
    //Extract id from params
    const { id } = req.params;

    //Call function to delete sale
    const sale = await deleteSale(id);

    //If sale not found
    if (sale.msg) return res.status(400).json({ msg: sale.msg });
    return res.status(200).json({ msg: "Sale deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting sale",
    });
  }
};

//Create router
const saleRouter = Router();

//Define routes
saleRouter.post("/create-sale", [], saveAndFlush);
saleRouter.get("/getAll-sales", [], getAllSales);
saleRouter.patch("/changeStatus-sale/:id", [], changeSaleStatus);
saleRouter.delete("/deleteById-sale/:id", [], deleteSaleById);

//Export router
module.exports = { saleRouter };
