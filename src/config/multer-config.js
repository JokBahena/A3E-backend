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

  //acept pdf
  if (file.mimetype === "application/pdf") {
    // Accept file
    cb(null, true);
  } else {
    // Reject file
    cb(new Error("Solo se permiten archivos con la extension .pdf"), false);
  }
};

//Upload file
const upload = multer({ storage: storage });

//Export function
module.exports = { upload };
