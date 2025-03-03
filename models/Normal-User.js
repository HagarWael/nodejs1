const User = require("./User");
const mongoose = require("mongoose");
const normalUserSchema = mongoose.Schema({
  profilepic: { type: String, default: "" },
  bio: { type: String, maxlength: 100 },
});
const normalUser = User.discriminator("normalUser", normalUserSchema);
module.exports = normalUser;
