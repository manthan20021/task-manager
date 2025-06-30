const mongoose = require("mongoose");
require("dotenv").config();

 const mongoUriLocel = process.env.MONGODB_LOCAL_URL

const conectDB = async () => {
  try {
    await mongoose.connect(mongoUriLocel);
    console.log("connected to DB");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};

module.exports = conectDB;