const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = () => {
  mongoose
    .connect(`${process.env.DATABASE_URL}/${process.env.DATABASE}`)
    .then(() => console.log("db connection successful"))
    .catch((err) => {
      console.log("db connection unsuccessful");
      console.error(err);
      process.exit(1);
    });
};
module.exports = dbConnect;
