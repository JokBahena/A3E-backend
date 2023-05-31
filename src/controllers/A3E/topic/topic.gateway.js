const Topic = require("../../../models/A3E/topic");

//Function to save and send data
const save = async (section) => {
  try {
    if (!section) return { msg: "Missing fields" };

    //If topic exists
    const sectionExist = await Topic.findOne({ nameSection: section.nameSection });
    console.log(topicExist);

    //If section exists
    if (sectionExist) return { msg: "Section already exists" };

    //Create topic
    const topic = new Topic({
      section,
    });

    //Save topic
    return await topic.save();
  } catch (error) {
    console.log(error);
  }
};

//Export function
module.exports = { save };
