const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: { type: String, maxLength: 600 },
    email: { type: String, maxLength: 600 },
    avatarImage: { type: String, maxLength: 600 },
    password: { type: String, maxLength: 20 },
  },
  {
    timestamps: true,
  }
);
User.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("User", User);
