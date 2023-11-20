const User = require("../models/User");
const bcrypt = require("bcrypt");
class UserController {
  create(req, res, next) {
    // res.json(req.body);
    const user = new User(req.body);
    user
      .save()
      .then(() =>
        res.send({
          message: "Thêm mới thành công",
          result: req.body,
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username }).lean();
      if (!user)
        return res.json({
          msg: "Incorrect Username",
          status: false,
        });
      if (password === user.password) {
        res.send({
          message: "Login successful",
          status: true,
        });
      } else {
        return res.json({
          msg: "Incorrect Password",
          status: false,
        });
      }
      delete user.password;
    } catch (ex) {
      next(ex);
    }
  };
  getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({ _id: { $ne: req.params.id } }).select([
        "email",
        "username",
        "_id",
      ]);
      return res.json(users);
    } catch (ex) {
      next(ex);
    }
  };
}

module.exports = new UserController();
