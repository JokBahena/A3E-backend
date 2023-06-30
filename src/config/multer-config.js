const multer = require("multer");

//Configurations for multer
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    //Name of the file
    cb(null, file.originalname);
  },
});

//Upload file
const uploadFile = multer({ storage: storage });

//Export function
module.exports = { uploadFile };
