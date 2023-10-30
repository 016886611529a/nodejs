const express = require("express");

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

module.exports = router;
