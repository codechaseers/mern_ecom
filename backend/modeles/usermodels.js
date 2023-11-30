const mongoose = require("mongoose");
const validator = require("validator");
const bcryipt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const usershema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name "],
    maxLength: [30, "Name should be less then 30 characters "],
    minLength: [4, "Name should be greater then 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email "],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password "],
    minLength: [4, "Password should be greater then 4 characters"],
    select: false,
  },
  // select false is use denay acess to getthe data when find() method call

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
 
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
// convert password to hash using bcryipt
//hear we not use ()=>  bcz it is not have this

usershema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryipt.hash(this.password, 10);
});
// jwt token generate function

usershema.methods.getJwttoken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JET_EXPIRE,
  });
};

// password compaire function

usershema.methods.comparePassword = async function (enterpassword) {
  return await bcryipt.compare(enterpassword, this.password);
};

//Generating password reset token function

usershema.methods.getResetPasswordToken = async function () {
  // Generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Add this token in hashing format in to user shema  resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //Define the resetPasswordExpire  field in user shema  
  this.resetPasswordExpire = Date.now() + 15 * 60 + 1000;
  return resetToken

};

const usermodel = mongoose.model("users", usershema);
module.exports = usermodel;
