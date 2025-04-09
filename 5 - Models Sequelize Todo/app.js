"use strict";

/*//? ------------------------------ Express Start ----------------------------- */

const express = require("express");
const app = express();

/*//? -------------------------- dotenv Configuration -------------------------- */

require("dotenv").config();
const PORT = process.env.PORT || 800;

/*//? ---------------------------- JSON Body Parsing --------------------------- */

app.use(express.json());

/*//? ---------------------------- Import Sequelize ---------------------------- */

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + process.env.SQLITE);

/*//? ---------------------------- Model Definition ---------------------------- */

const Todo = sequelize.define("todos", {
  title: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  description: DataTypes.STRING,
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

/*//? ----------------------------- Synchronization ---------------------------- */

// sequelize.sync(); //* Run one time after comment out
// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });

/*//? ------------------------------ Connect to DB ----------------------------- */

sequelize
  .authenticate()
  .then(() => console.log("* DB Connected"))
  .catch(() => console.log("* DB Not Connected"));

/*//? ----------------------------- CRUD Operations ---------------------------- */

const router = express.Router();
app.use(router);

//! CREATE

router.post("/todos", async (req, res) => {
  const result = await Todo.create(req.body);
  res.status(201).send({
    error: false,
    result: result,
  });
});

//! READ

router.get("/todos", async (req, res) => {
  const result = await Todo.findAndCountAll(); //* List and count all Todos
  res.status(200).send({
    error: false,
    result,
  });
});

router.get("/todos/:id", async (req, res) => {
  const result = await Todo.findByPk(req.params.id); //* Find by Id
  res.status(200).send({
    error: false,
    result,
  });
});

//! UPDATE

router.put("/todos/:id", async (req, res) => {
  const result = await Todo.update(req.body, { where: { id: req.params.id } });
  res.status(202).send({
    error: false,
    result,
    updated: await Todo.findByPk(req.params.id),
  });
});

//! DELETE

router.delete("/todos/:id", async (req, res) => {
  const result = await Todo.destroy({ where: { id: req.params.id } });
  if (result) {
    res.sendStatus(204);
  } else {
    res.errorStatusCode = 404;
    throw new Error("Data is not found or already deleted");
  }
});

/*//? ------------------------------ Error Handler ----------------------------- */

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler Activated");
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};

/*//? ----------------------------- Running Server ----------------------------- */

app.listen(PORT, () => console.log(`Running at http://127.0.0.1:${PORT}`));
