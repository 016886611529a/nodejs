const Course = require("../models/Course");
class CourseController {
  // [GET]  /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch(next);
  }
  // Course.findOne({ slug: req.params.slug }) để tìm một bản ghi, findAll tìm tất cả
  // [GET]  /course/create
  create(req, res, next) {
    res.render("courses/create");
  }
  // [POST]  /course/store
  store(req, res, next) {
    // res.json(req.body);
    const formData = req.body;
    formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`;
    const course = new Course(formData);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((error) => {});
  }
  // [GET]  /course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .lean()
      .then((course) => {
        res.render("courses/edit", { course });
      })
      .catch(next);
  }
  // [PUT]  /course/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }
}
// res.json(req.body);cái này là để kiểm tra coi mình đã submit bằng post hay put được chưa
module.exports = new CourseController();
