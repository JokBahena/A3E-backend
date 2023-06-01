const Intern = require("../../../../models/A3E/intern");

//Function to save and send data for intern
const save = async (
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
) => {
  try {
    //Validate fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !age ||
      !institution ||
      !typePeriod ||
      !typePractice ||
      !degree ||
      !source
    )
      return { msg: "Missing fields" };

    //If user exists
    const internExist = await Intern.findOne({ email });
    if (internExist) return { msg: "Your request is already registered" };

    //Create intern
    const intern = new Intern({
      fullName: fullName,
      email: email,
      phone: phone,
      age: age,
      institution: institution,
      typePeriod: typePeriod,
      typePractice: typePractice,
      degree: degree,
      source: source,
      info: info,
    });

    //Save intern
    return await intern.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to find all intern
const findAll = async () => {
  try {
    return await Intern.find().select("-_id fullName email phone");
  } catch (error) {
    console.log(error);
  }
};

//Function to find intern by id
const findById = async (id) => {
  try {
    const intern = await Intern.findById(id).select(
      "-_id fullName email phone age institution typePeriod typePractice degree source info"
    );

    //If intern exists
    if (!intern) return { msg: "Intern not found" };

    return intern;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  save,
  findAll,
  findById,
};
