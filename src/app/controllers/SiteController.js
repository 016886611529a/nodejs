const Course = require("../models/Course");
class SiteController {
  // [GET]  /home
  // async index(req, res) {
  //   try {
  //     const data = await Course.find({});
  //     res.json(data);
  //   } catch (err) {
  //     res.status(400).json({ error: err });
  //   }

  //   // res.render('home');
  // }
  index(req, res, next) {
    Course.find({})
      .lean()
      .then((courses) => res.render("home", { courses: courses }))
      .catch((error) => next(error));
  }
  // [GET]  /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
