const Sale = require("../../models/A3E/sale");

//Funtion to save a new sale
const save = async (
  fullName,
  email,
  phone,
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
    const saleExist = await Sale.findOne({ email });
    if (saleExist) return { msg: "Sale already exists" };

    //Create sale
    const sale = new Sale({
      fullName,
      email,
      phone,
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

//Export functions
module.exports = {
  save,
};
