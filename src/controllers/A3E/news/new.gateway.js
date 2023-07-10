const New = require("../../../models/A3E/news/new");

const save = async (title, type, summary, date, author, content) => {
  try {
    if (!title) return { msg: "Title is required" };

    if (!type) return { msg: "Type is required" };

    if (!summary) return { msg: "summary is required" };

    if (!content) return { msg: "Content is required" };

    const newExist = await New.findOne({
      title,
    });
    if (newExist) return { msg: "New already exists" };

    const dataNew = new New({
      title: title,
      type: type,
      summary: summary,
      content: content,
      date: date,
      author: author,
    });

    return await dataNew.save();
  } catch (error) {
    console.log(error);
  }
};

const findAll = async () => {
  try {
    return await New.find();
  } catch (error) {
    console.log(error);
  }
};

const findById = async (id) => {
  try {
    const dataNew = await New.findById(id);
    if (!dataNew) return { msg: "New not found" };
    return dataNew;
  } catch (error) {
    console.log(error);
  }
};

const update = async (id, title, content) => {
  try {
    if (!title) return { msg: "Title is required" };

    const dataNew = await New.findById(id);
    if (!dataNew) return { msg: "New not found" };

    if (title === dataNew.title) {
      const newExist = await New.findOne({
        title,
      });
      if (dataNew) return { msg: "New already exists" };
    }

    dataNew.title = title;
    dataNew.title = title;

    return await dataNew.save();
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    const dataNew = await New.findById(id);
    if (!dataNew) return { msg: "New not found" };

    return await New.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  save,
  findAll,
  findById,
  update,
  deleteById,
};
