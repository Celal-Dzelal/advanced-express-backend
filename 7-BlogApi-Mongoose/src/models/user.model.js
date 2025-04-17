"use strict";

const mongoose = require("mongoose");

const crypto = require("node:crypto"); //* We import the crypto method by specifying that it comes from node js

const passwordEncrypte = require("../utils/passwordEncrypte");

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
