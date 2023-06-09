const PruebaTiny = require("../models/pruebaTiny");

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

//Export functions
module.exports = {
  save,
};
