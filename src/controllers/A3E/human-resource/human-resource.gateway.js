const Vacancie = require("../../../models/A3E/vacancie");
const Intern = require("../../../models/A3E/intern");

//Function to save and send data for vacancie
const saveVacancie = async (
  fullName,
  email,
  phone,
  age,
  address,
  education,
  position,
  source,
  curriculum
) => {
  try {
    //Validate fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !age ||
      !address ||
      !education ||
      !position ||
      !source ||
      !curriculum
    )
      return { msg: "Missing fields" };

    //If user exists
    const vacancieExist = await Vacancie.findOne({ email });
    if (vacancieExist) return { msg: "Your request is already registered" };

    //Create vacancie
    const vacancie = new Vacancie({
      fullName: fullName,
      email: email,
      phone: phone,
      age: age,
      address: address,
      education: education,
      position: position,
      source: source,
      curriculum: curriculum,
    });

    //Save vacancie
    return await vacancie.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to find all vacancie
const findAllVacancie = async () => {
  try {
    return await Vacancie.find().select("-_id fullName email phone");
  } catch (error) {
    console.log(error);
  }
};

///////////////////////////////////////////Intern///////////////////////////////////////////

//Function to save and send data for intern
const saveIntern = async (
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
      !source ||
      !info
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

const findAllIntern = async () => {
  try {
    return await Intern.find().select("-_id fullName email phone");
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = { saveVacancie, findAllVacancie, saveIntern, findAllIntern };
