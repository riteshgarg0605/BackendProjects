// import the model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// define route handler

exports.createComment = async (req, res) => {
  try {
    //   destructure data from request body
    const { postId, user, body } = req.body;
    //   create a comment object
    const comment = new Comment({
      postId,
      user,
      body,
    });
    // save the new comment in the comment collection
    const savedComment = await comment.save();
    //   find the post by Id and update new comment in the post collection
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: savedComment._id },
      },
      { new: true }
    )
      .populate("comments") //Populate the comments array with comment documents
      .exec();

    // if (!updatedPost) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Post not found",
    //   });
    // }
    res.status(200).json({
      success: true,
      // data: post.comments,
      post: updatedPost,
      message: "Comment added successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error!");
  }
};
