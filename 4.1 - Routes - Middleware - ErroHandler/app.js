"use strict";

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(express.json());

/*//* --------------------------------- Imports -------------------------------- */

const { middleware1, middleware2 } = require("./middlewares/middleware");

app.use("/", middleware1, middleware2, require("./routes/router"));

app.use(require("./middlewares/errorHandler"));

/*//* -------------------------------------------------------------------------- */
app.listen(PORT, () => console.log(`Running at http://127.0.0.1:${PORT}`));
