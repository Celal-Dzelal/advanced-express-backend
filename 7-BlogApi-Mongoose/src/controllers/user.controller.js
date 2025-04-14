"use strict";

const User = require("../models/user.model");

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
    const result = await User.deleteOne(req.params.id);
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
};
