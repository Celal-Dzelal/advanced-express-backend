"use strict";

const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  req.user = null; //* Later it will hold the authenticated user's info
  const { _id, email } = req.session || {};
  if (_id && email) {
    //* Check _id and email are present
    try {
      const user = await User.findOne({ _id, email });
      if (user) {
        req.user = user;
      } else {
        req.session = null;
      }
    } catch (error) {
      req.session = null;
      console.error("Authentication Error:", error);
    }
  }
  next();
};
