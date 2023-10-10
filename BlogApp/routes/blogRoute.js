const express = require("express");
const router = express.Router();

//Import Controllers
const { likePost, unlikePost } = require("../controllers/likeController");
const { createComment } = require("../controllers/commentController");
const {
  getPosts,
  getPostById,
  createPost,
} = require("../controllers/postController");

// Define API routes
router.post("/posts/create", createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.post("/likes/like/", likePost);
router.delete("/likes/unlike", unlikePost);
router.post("/comments/create", createComment);

module.exports = router;
