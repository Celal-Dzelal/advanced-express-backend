"use strict";

const router = require("express").Router();
const todo = require("../controllers/todo.controller");

router.route("/todos").get(todo.list).post(todo.create);

router.route("/todos/:id").get(todo.read).put(todo.update).delete(todo.delete);

module.exports = router;
