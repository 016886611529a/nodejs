const Course = require("../models/Course");
class MeController {
  // [GET]  me/stored/courses
  storedCourses(req, res) {
    Course.find({})
      .lean()
      .then((courses) => res.render("me/stored-courses", { courses: courses }))
      .catch((error) => next(error));
  }
}

module.exports = new MeController();
