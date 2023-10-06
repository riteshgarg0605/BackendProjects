// import the model
const Todo = require("../models/Todo");

// define route handler

exports.getTodo = async (request, response) => {
  try {
    // fetch all todo items from DB
    const todos = await Todo.find({});

    // update response status
    response.status(200).json({
      success: true,
      data: todos,
      message: "Entire todo data fetched.",
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({
      success: false,
      error: err.message,
      message: "Internal server error",
    });
  }
};

exports.getTodoById = async (request, response) => {
  try {
    // fetch the ID fisrt
    const id = request.params.id;

    // then fetch the todo by ID
    const todo = await Todo.findById(id);

    // update response status- If data for given id is not found
    if (!response) {
      return response.status(404).json({
        success: false,
        message: `No data found for given id-${id}`,
      });
    }
    // update response status- If data is found
    response.status(200).json({
      success: true,
      data: todo,
      message: `Todo for id-${id} found successfully`,
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
