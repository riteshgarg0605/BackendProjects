// import the model
const Todo = require("../models/Todo");

// define route handler

exports.deleteTodo = async (request, response) => {
  try {
    // fetch id
    const id = request.params.id;
    //   find and delete by id
    await Todo.findByIdAndDelete(id);
    //   update response status
    response.status(200).json({
      success: true,
      message: "Todo deleted",
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
