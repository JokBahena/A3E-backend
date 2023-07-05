const Sale = require("../../models/A3E/sale");

//Funtion to save a new sale
const save = async (
  fullName,
  phone,
  email,
  typeService,
  enterprise,
  address,
  info
) => {
  try {
    //If missing fields
    if (!fullName || !email || !typeService || !enterprise || !address)
      return { msg: "Missing fields" };

    //If sale exists
    const saleExist = await Sale.findOne({
      $or: [{ email: email }, { enterprise: enterprise }],
    });
    if (saleExist) return { msg: "Your request is already registered" };

    //Create sale
    const sale = new Sale({
      fullName,
      phone,
      email,
      typeService,
      enterprise,
      address,
      info,
    });

    //Save sale
    return await sale.save();
  } catch (error) {
    console.log(error);
    return null;
  }
};

//Function to get all sales
const findAll = async () => {
  try {
    //Get all sales
    return await Sale.find();
  } catch (error) {
    console.log(error);
  }
};

//Function to change sale status
const changeStatus = async (id) => {
  try {
    //Find sale
    const sale = await Sale.findById(id);

    //If sale not found
    if (!sale) return { msg: "Sale not found" };

    //Change status
    sale.status = !sale.status;

    //Save sale
    return await sale.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to delete sale
const deleteSale = async (id) => {
  try {
    //Find sale
    const sale = await Sale.findById(id);

    //If sale not found
    if (!sale) return { msg: "Sale not found" };

    //Delete sale
    return await Sale.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
  changeStatus,
  deleteSale,
};
