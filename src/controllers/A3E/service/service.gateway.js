const Service = require("../../../models/A3E/service");

//Function to save and send data for service
const save = async (title, subtitle, summary, content) => {
  try {
    //If missing fields
    if (!title || !summary || !content) return { msg: "Title is required" };

    //If service exists
    const serviceExist = await Service.findOne({ title });
    if (serviceExist) return { msg: "Service already exists" };

    //Create service
    const service = new Service({
      title: title,
      subtitle: subtitle,
      summary: summary,
      content: content,
    });

    //Save service
    return await service.save();
  } catch (error) {
    console.log(error);
  }
};

//Function to find all services
const findAll = async () => {
  try {
    //Find all services
    return await Service.find();
  } catch (error) {
    console.log(error);
  }
};

//Function to find service by id
const findById = async (id) => {
  try {
    //Find service by id
    const service = await Service.findById(id);
    if (!service) return { msg: "Service not found" };
    return service;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, title, subtitle, summary, content) => {
  try {
    // If missing fields
    if (!title || !summary || !content) return { msg: "Title is required" };

    // If service exists
    const service = await Service.findById(id);
    if (!service) return { msg: "Service not found" };

    // Check if title is already in use
    if (title !== service.title) {
      const serviceExist = await Service.findOne({ title });
      if (serviceExist) return { msg: "Service already exists" };
    }

    // Update service
    service.title = title;
    service.subtitle = subtitle;
    service.summary = summary;
    service.content = content;

    // Save service
    return await service.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    // Find service by id
    const service = await Service.findById(id);
    if (!service) return { msg: "Service not found" };

    // Delete service
    return await Service.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

//Export functions
module.exports = {
  save,
  findAll,
  findById,
  update,
  deleteById,
};
