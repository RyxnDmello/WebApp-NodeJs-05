require("dotenv").config();
const mongoose = require("mongoose");

module.exports.ConnectDatabase = async () => {
  await mongoose.connect(
    `${process.env.DATABASE_URI}/${process.env.DATABASE_DB}`,
    {
      useNewUrlParser: true,
    }
  );
};
