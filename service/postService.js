const Post = require("../models/Post");
exports.CreatePost = async (PostData) => {
  return await Post.create(PostData);
};

exports.DeletePost = async (postId) => {
  return await Post.findByIdAndDelete(postId);
};
exports.UpdatePost = async (postId, uploadData) => {
  return await Post.findByIdAndUpdate(postId, uploadData, { new: true });
};
//b2ra kol el posts with user details
exports.GetAllPostById = async () => {
  return await Post.find().populate("userId", "username");
};
