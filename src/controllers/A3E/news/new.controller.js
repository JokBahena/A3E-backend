const {
  save,
  findAll,
  findById,
  update,
  deleteById,
} = require("./new.gateway");
const { Respone, Router } = require("express");

const saveAndFlush = async (req, res = Response) => {
  try {
    const { title, type, summary, date, author, content } = req.body;

    const dataNew = await save(title, type, summary, date, author, content);

    if (dataNew.msg)
      return res.status(400).json({
        msg: dataNew.msg,
      });
    return res.status(200).json({ msg: "New saved" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error saving New",
    });
  }
};

const getAll = async (req, res = Response) => {
  try {
    const dataNew = await findAll();

    if (!dataNew)
      return res.status(400).json({
        msg: "New not found",
      });
    return res.status(200).json({
      dataNew,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting News",
    });
  }
};

const getById = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const dataNew = await findById(id);

    if (dataNew.msg)
      return res.status(400).json({
        msg: dataNew.msg,
      });

    return res.status(200).json({ dataNew });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error getting New",
    });
  }
};

const updateById = async (req, res = Response) => {
  try {
    const { id } = req.params;

    const { title, type, summary ,content } = req.body;

    const dataNew = await update(id, title, type,summary,content);

    if (dataNew.msg)
      return res.status(400).json({
        msg: dataNew.msg,
      });
    return res.status(200).json({
      msg: "New updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error updating New",
    });
  }
};

const deleteNew = async (req, res = Response) => {
  try {
    const { id } = req.params;

    const dataNew = await deleteById(id);

    if (dataNew.msg)
      return res.status(400).json({
        msg: dataNew.msg,
      });
    return res.status(200).json({
      msg: "New deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Error deleting New",
    });
  }
};

const newRouter = Router();

newRouter.post("/create-new", [], saveAndFlush);
newRouter.get("/getAll-news", [], getAll);
newRouter.get("/getById-new/:id", [], getById);
newRouter.put("/updateById-new/:id", [], updateById);
newRouter.delete("/deleteById-new/:id", [], deleteNew);

module.exports = { newRouter };
