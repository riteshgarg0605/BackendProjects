const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// import routes for TODO API
const todoRoutes = require("./routes/todos");
// mount the todo API routes
app.use("/api/v1", todoRoutes);

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});

const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req, res) => {
  res.send("This is the homepage");
});
