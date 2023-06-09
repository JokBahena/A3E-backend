const Vacancie = require("../../../../models/A3E/vacancie");
const { uploadMultimedia } = require("../../../../utils/cloudinary/upload");
const { deleteImage } = require("../../../../utils/cloudinary/delete");

//Function to save and send data for vacancie
const save = async (
  fullName,
  phone,
  email,
  age,
  residence,
  education,
  position,
  source,
  curriculumPath
) => {
  try {
    //Validate fields
    if (
      !fullName ||
      !email ||
      !age ||
      !residence ||
      !education ||
      !position ||
      !source ||
      !curriculumPath
    )
      return { msg: "Missing fields" };

    //If user exists (email or fullName)
    const vacancieExists = await Vacancie.findOne({
      $or: [{ email: email }, { fullName: fullName }],
    });
    if (vacancieExists) return { msg: "Your request is already registered" };

    // const vacancieExist = await Vacancie.findOne({ email, fullName });
    // if (vacancieExist) return { msg: "Your request is already registered" };

    //Call function to upload file
    const fileUrl = await uploadMultimedia(
      curriculumPath,
      fullName,
      "curriculum"
    );

    //Create vacancie
    if (!fileUrl) {
      return { msg: "Error uploading file" };
    } else {
      const vacancie = new Vacancie({
        fullName: fullName,
        phone: phone,
        email: email,
        age: age,
        residence: residence,
        education: education,
        position: position,
        source: source,
        curriculum: fileUrl,
      });

      //Save vacancie
      return await vacancie.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Function to find all vacancie
const findAll = async () => {
  try {
    return await Vacancie.find();
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

//Function to change vacancie status
const changeStatus = async (id) => {
  try {
    //Find vacancie by id
    const vacancie = await Vacancie.findById(id);

    //If vacancie exists
    if (!vacancie) return { msg: "Vacancie not found" };

    //Change status
    vacancie.status = !vacancie.status;

    //Save vacancie
    return await vacancie.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    //Validate fields
    if (!id) return { msg: "Missing fields" };

    //Find vacancie by id
    const vacancie = await Vacancie.findById(id);
    if (!vacancie) return { msg: "Vacancie not found" };

    //Delete file
    const result = await deleteImage(vacancie.curriculum, "curriculum");

    //If file was deleted
    if (!result) return { msg: "Error deleting file" };

    //Delete vacancie
    return await Vacancie.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = { save, findAll, findById, changeStatus, deleteById };
