const PruebaTiny = require("../../models/pruebaTiny");

//Function to save
const save = async (content) => {
  try {
    if (!content) return { msg: "Content is required" };
    const pruebaTiny = new PruebaTiny({ content });
    return await pruebaTiny.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

const findAll = async () => {
  try {
    return await PruebaTiny.find().select("-_id content");
  } catch (error) {
    console.log(error);
  }
};

const findById = async (id) => {
  try {
    const pruebaTiny = await PruebaTiny.findById(id).select("-_id content");

    if (!pruebaTiny) return { msg: "PruebaTiny not found" };
    return pruebaTiny;
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
  findById,
};
