"use strict";

const User = require("../models/user.model");
const passwordEncrypte = require("../utils/passwordEncrypte");

module.exports = {
  list: async (req, res) => {
    const result = await User.find();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await User.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await User.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await User.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      result,
      updated: await User.findById(req.params.id),
    });
  },
  delete: async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id });
    if (!result) {
      res.errorStatusCode = 404;
      throw new Error("Data not found or already deleted");
    }
    res.status(204).send({
      error: false,
    });
  },
  deleteAll: async (req, res) => {
    const result = await User.deleteMany();
    res.status(204).send({
      error: false,
    });
  },
  login: async (req, res) => {
    const { email, password, rememberMe } = req.body;

    //* Check email and password
    if (!email || !password) {
      res.errorStatusCode = 401;
      throw new Error("Email and Password are required");
    }
    //* Find user and control password
    const user = await User.findOne({ email });
    if (!user || user.password !== passwordEncrypte(password)) {
      res.errorStatusCode = 401;
      throw new Error("Wrong email or password");
    }
    //* "rememberMe" option and expire time
    if (rememberMe) {
      req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; //* 3 days. Default value is 1 day
    } else {
      req.sessionOptions.expires = false; //* When browser close, expire end
    }
    req.session.email = user.email;
    req.session._id = user._id;
    //* Successful Login
    res.status(200).send({
      error: false,
      message: "Login Success",
      user,
    });
  },
  logout: async (req, res) => {
    req.session = null; //* We provided logout by emptying the session
    res.status(200).send({
      error: false,
      message: "Logout Success",
    });
  },
};
