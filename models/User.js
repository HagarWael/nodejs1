const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "normalUser"],
      required: true,
    },
  },
  { discriminatorKey: "role" }
);
module.exports = mongoose.model("User", UserSchema);
