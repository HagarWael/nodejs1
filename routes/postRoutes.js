const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

router.post("/create", verifyToken, postController.CreatePost);
router.delete("/:id", verifyToken, postController.DeletePost);
router.put("/:id", verifyToken, postController.updatePost);
module.exports = router;
