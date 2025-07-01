const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


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

UserSchema.pre("save", async function(next){
  //wher to store
  const user = this;
  //only incrypt password when user is updating or modifiding password
  if (!user.isModified('password')) return next();
  try {
    //hashing password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    //replesing password with hashedPassword
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comperPassword = async function(password){
  let user = this
  try {
    const isMatchd = await bcrypt.compare(password, user.password)
    return isMatchd
  } catch (error) {
    throw error
  }
}

const User = mongoose.model("user", UserSchema);
module.exports = User;
