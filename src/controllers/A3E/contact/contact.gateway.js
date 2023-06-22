const Contact = require("../../../models/A3E/contact");

//Function to save and send data for contact
const save = async (type, contact) => {
  try {
    //If missing fields
    if (!type || !contact) return { msg: "Missing fields" };

    //Create contact
    const contactx = new Contact({
      type: type,
      contact: contact,
    });

    //Save contact
    return await contactx.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to get all contacts
const findAll = async () => {
  try {
    //Get all contacts
    return await Contact.find();
  } catch (error) {
    console.log(error);
  }
};

//Function to find contact by id
const findById = async (id) => {
  try {
    //Get contact by id
    const contact = await Contact.findById(id).select("-_id type contact");

    //If contact exists
    if (!contact) return { msg: "Contact not found" };
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    //Get contact by id
    const contactExists = await Contact.findById(id);

    //If contact exists
    if (!contactExists) return { msg: "Contact not found" };
    return await Contact.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = { save, findAll, findById, deleteById };
