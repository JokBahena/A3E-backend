const Client = require("../../../models/A3E/client");
const { uploadMultimedia } = require("../../../utils/cloudinary/upload");

//Function to save and send data for client
const save = async (name, imagePath) => {
  try {
    //If missing fields
    if (!name || !imagePath) return { msg: "Missing fields" };

    //If client exists
    const clientExist = await Client.findOne({ name });
    if (clientExist) return { msg: "Client already exists" };

    //Call function to upload image
    const imageUrl = await uploadMultimedia(imagePath, name, "clients");

    //If image upload fails
    if (!imageUrl) {
      return { msg: "Error uploading image" };
    } else {
      //Create client
      const client = new Client({
        name: name,
        image: imageUrl,
      });

      //Save client
      return await client.save();
    }
  } catch (error) {
    console.log(error);
  }
};

//Function to get all clients
const findAll = async () => {
  try {
    //Get all clients
    return await Client.find();
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
};
