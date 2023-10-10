// import the model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

// define route handler

exports.likePost = async (req, res) => {
  try {
    const { postId, user } = req.body;
    const like = await Like.create({ postId, user });
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: like._id },
      },
      { new: true }
    )
      .populate("likes")
      .exec();
    res.status(200).json({
      success: true,
      message: "Post liked successfully!",
      data: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};

// define route handler

exports.unlikePost = async (req, res) => {
  try {
    const { postId, likeId } = req.body;
    //   delete the like from the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: likeId } },
      { new: true }
    )
      .populate("likes")
      .exec();
    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found!",
      });
    }

    //   delete the like from like model
    const deletedLike = await Like.findByIdAndDelete(likeId);
    if (!deletedLike) {
      return res.status(404).json({
        success: false,
        message: "Like not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post unliked successfully!",
      data: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
