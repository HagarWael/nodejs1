const User = require("../models/User");
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  permissions: { type: [String], default: ["manage_users", "manage_posts"] },
});
const admin = User.discriminator("admin", adminSchema);
module.exports = admin;
