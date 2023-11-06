const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const studentController = require("../app/controllers/StudentController");
//newsController.index

router.get("/search", siteController.search);
router.get("/", siteController.index);
router.get("/student", studentController.getList);

router.get("/student/:id", studentController.getById);

router.post("/student", studentController.addNew);

router.put("/student", studentController.update);

router.delete("/student/:id", studentController.delete);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu trữ tệp
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); // Đổi tên tệp
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
let upload = multer({
  storage: storage,
  fileFilter: imageFilter,
});

router.post(
  "/upload",
  //   upload.single("file"),
  upload.array("files", 5),
  studentController.handleUploadFile
);
//nếu không muốn giới hạn số lượng file thì bò số lượng sau file
module.exports = router;
