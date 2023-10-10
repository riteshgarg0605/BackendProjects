// import the model
const Post = require("../models/postModel");

// define route handler

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const newPost = await Post.create({
      title,
      body,
    });
    res.status(200).json({
      success: true,
      data: newPost,
      message: "New post created successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// define route handler

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("likes")
      .populate("comments")
      .exec();
    if (posts == "") {
      return res.status(404).json({
        success: false,
        message: "No post found",
      });
    }
    res.status(200).json({
      success: true,
      post: posts,
      message: "Posts found successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

// define route handler

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id)
      .populate("likes")
      .populate("comments")
      .exec();
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      data: post,
      message: "Post found successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
