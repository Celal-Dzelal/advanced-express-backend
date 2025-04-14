"use strict";

const mongoose = require("mongoose");

const crypto = require("node:crypto"); //* We import the crypto method by specifying that it comes from node js

//* It takes a data as a parameter which we want to encrypt
const passwordEncrypte = (password) => {
  const salt = "kjsdak464dsfsm329840q3fsdşfösdf5d6d4famdadsş55"; //* encryption info
  const iteration = 10000; //* How many time encryption mechanism will work
  const keylen = 32; //* Number of characters. Write 32, get 64.
  const digist = "sha512"; //* Algorithm which we will use
  return crypto
    .pbkdf2Sync(password, salt, iteration, keylen, digist)
    .toString(hex); //* Data comes as buffer in first time, therefore, we transform to string hex.
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: [true, "This email address is already in use"],
      trim: true,
      validate: [
        (email) => {
          return email.includes("@") && email.includes(".");
        },
        "Invalid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password field is required"],
      trim: true,
      set: passwordEncrypte,
    },
    firstName: String,
    lastName: String,
  },
  { collection: "users", timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
