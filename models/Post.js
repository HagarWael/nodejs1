const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comment: [
      {
        userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        creation: { type: Date },
      },
    ],
  },

  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
