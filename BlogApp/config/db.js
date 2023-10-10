// Config file for database connection

const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Connection to database is successful");
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = dbConnection;
