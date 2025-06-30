const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

UserSchema.pre("save", async (next) => {
  //wher to store
  const user = this;
  //only incrypt password when user is updating or modifiding password
  if (!user.isModifide("password")) return next();
  try {
    //creating salt
    const salt = await bcrypt.genSalt(10);
    //hashing password
    const hashedPassword = bcrypt.hash(user.password, salt);
    //replesing password with hashedPassword
    user.passport = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.method.comperPassword = async function(candidetPassword){
  try {
    const isMatchd = await bcrypt.compare(candidetPassword, this.password)
    return isMatchd
  } catch (error) {
    throw error
  }
}

const user = mongoose.model("user", UserSchema);
module.exports = user;
