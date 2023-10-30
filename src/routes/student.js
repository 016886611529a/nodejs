module.exports = function (app) {
  var studentController = require("../app/controllers/StudentController");
  app.get("/student", studentController.getList);

  app.get("/student/:id", studentController.getById);

  app.post("/student", studentController.addNew);

  app.put("/student", studentController.update);

  app.delete("/student/:id", studentController.delete);
};
