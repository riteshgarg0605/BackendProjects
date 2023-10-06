// import the model
const Todo = require("../models/Todo");

// define route handler

exports.createTodo = async (request, response) => {
  try {
    //   extract title and desc from request body
    const { title, description } = request.body;
    // create a new Todo obj and insert in db
    const response = await Todo.create({ title, description });
    response.status(200).json({
      success: true,
      data: response,
      message: "Entry created successfully",
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
