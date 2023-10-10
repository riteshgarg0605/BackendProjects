const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Port & server setup
require("dotenv").config();
const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server is listening on port ${port}`));

// Initiate database connection
const dbConnection = require("./config/db");
dbConnection();

// default route
app.get("/", (req, res) => {
  res.send("Home page");
});

// setting up API routes
const router = require("./routes/blogRoute");
app.use("/api/v1", router);
