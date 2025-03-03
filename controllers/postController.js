const postService = require("../service/postService");

exports.CreatePost = async (req, res) => {
  try {
    const post = postService.CreatePost(req.body.title, req.user.userId);
    res.status(200).json({ post });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.DeletePost = async (req, res) => {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
