"use strict";

const Todo = require("../models/todo.model");

module.exports = {
  list: async (req, res) => {
    const result = await Todo.findAndCountAll();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    const result = await Todo.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    const result = await Todo.findByPk(req.params.id);
    res.status(201).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = await Todo.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(202).send({
      error: false,
      result,
      updated: await Todo.findByPk(req.params.id),
    });
  },
  delete: async (req, res) => {
    const result = await Todo.destroy({ where: { id: req.params.id } });
    if (result) {
      res.status(204);
    } else {
      res.errorStatusCode = 404;
      throw new Error("Data is not found or already deleted");
    }
  },
};
