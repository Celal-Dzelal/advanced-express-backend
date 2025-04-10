"use strict";

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());

/*//! ------------------------------- Main Route ------------------------------- */

app.all("/", (req, res) => {
  res.send("Welcome to ToDo Api");
});

/*//! -------------------------------------------------------------------------- */

app.use(require("./routes/todo.router"));

app.use(require("./middlewares/errorHandler"));

/*//! -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log(`Running At http://127.0.0.1:${PORT}`));
