const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const secret = process.env.JWT_SECRET;
const Normaluser = require("../models/Normal-User");
const Admin = require("../models/Admin");
require("dotenv").config();

const registeredUser = async ({ username, email, password, role }) => {
  let user = await User.findOne({ email });
  if (user) throw new Error("User already exists");

  const hashedPass = await bcrypt.hash(password, 10);
  if (role === "normalUser") {
    user = new User({ username, email, password: hashedPass, role });
  } else if (role === "admin") {
    user = new User({ username, email, password: hashedPass, role });
  } else {
    throw new Error("Invalid role. Must be 'normalUser' or 'admin'.");
  }

  await user.save();
  return { message: "User Registered Successfully" };
};

const loginUser = async ({ email, password }) => {
  let user = await Normaluser.findOne({ email });
  if (!user) {
    user = await Admin.findOne({ email });
  }
  if (!user) throw new Error("Incorrect username or password");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Incorrect username or password");

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, role: user.role };
};

module.exports = { registeredUser, loginUser };
console.log("normalUser:", Normaluser);
console.log("Admin:", Admin);
