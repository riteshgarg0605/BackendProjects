// import the model
const Todo = require("../models/Todo");

// define route handler

exports.updateTodo = async (request, response) => {
  try {
    // fetch the ID fisrt (different method)
    const { id } = request.params;
    //   extract title and desc from request body
    const { title, description } = request.body;

    //  fetch the todo from db
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    // const updatedTodo = await Todo.findById(id);

    //   update response status
    response.status(200).json({
      success: true,
      data: updatedTodo,
      message: "Todo updated successfully!",
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({
      success: false,
      data: "internal server error",
      message: err.message,
    });
  }
};
