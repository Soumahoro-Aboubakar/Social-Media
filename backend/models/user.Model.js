import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const { isEmail } = validator;
const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      trim: true
    },
    
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
      unique: true,
    },

    picture: {
      type: String,
      default: "", //./uploads/profil/random-user.png
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],
    },
    following: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
/*
// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
*/
const compare = (userPassword, password) => {
  if (userPassword === password) {
    return true;
  } else {
    return false;
  }
};

userSchema.statics.login = async function (email , password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
