const Vacancie = require("../../../../models/A3E/vacancie");

//Function to save and send data for vacancie
const save = async (
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
const findAll = async () => {
  try {
    return await Vacancie.find().select("-_id fullName email phone");
  } catch (error) {
    console.log(error);
  }
};

//Function to find vacancie by id
const findById = async (id) => {
  try {
    //Find vacancie by id
    const vacancie = await Vacancie.findById(id).select(
      "-_id fullName email phone age address education position source curriculum"
    );

    //If vacancie exists
    if (!vacancie) return { msg: "Vacancie not found" };

    return vacancie;
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = { save, findAll, findById };
