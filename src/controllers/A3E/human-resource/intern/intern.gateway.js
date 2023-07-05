const Intern = require("../../../../models/A3E/intern");

//Function to save and send data for intern
const save = async (
  fullName,
  phone,
  email,
  age,
  institution,
  typePractice,
  degree,
  period,
  info
) => {
  try {
    //Validate fields
    if (
      !fullName ||
      !email ||
      !age ||
      !institution ||
      !typePractice ||
      !degree ||
      !period
    )
      return { msg: "Missing fields" };

    //If user exists
    const internExist = await Intern.findOne({
      $or: [{ fullName: fullName }, { email: email }],
    });
    if (internExist) return { msg: "Your request is already registered" };
    // const internExist = await Intern.findOne({ email });
    // if (internExist) return { msg: "Your request is already registered" };

    //Create intern
    const intern = new Intern({
      fullName: fullName,
      phone: phone,
      email: email,
      age: age,
      institution: institution,
      typePractice: typePractice,
      degree: degree,
      period: period,
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
    return await Intern.find();
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

//Function to change status intern
const changeStatus = async (id) => {
  try {
    //Find intern by id
    const intern = await Intern.findById(id);

    //If intern exists
    if (!intern) return { msg: "Intern not found" };

    //Change status
    intern.status = !intern.status;
    
    //Save intern
    return await intern.save();
  } catch (error) {
    console.log(error);
  }
};

//Funtion to delete intern by id
const deleteById = async (id) => {
  try {
    //Validate fields
    if (!id) return { msg: "Missing fields" };

    //Find intern by id
    const intern = await Intern.findById(id);

    //If intern exists
    if (!intern) return { msg: "Intern not found" };

    //Delete intern
    return await Intern.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  save,
  findAll,
  findById,
  changeStatus,
  deleteById,
};
