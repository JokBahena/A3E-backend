const multer = require("multer");

//Configurations for multer
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    //Name of the file
    cb(null, file.originalname);
  },
});

//Filter for multer
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    // Accept file
    cb(null, true);
  } else {
    // Reject file
    cb(
      new Error(
        "Solo se permiten archivos con las extensiones .jpg, .jpeg, .png"
      ),
      false
    );
  }
};

//Upload file
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Export function
module.exports = { upload };
