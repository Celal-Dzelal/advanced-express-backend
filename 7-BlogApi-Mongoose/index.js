"use strict";

// npm init -y && npm i mongoose express dotenv && npm i -D nodemon && cookie-session //* Setup command
// printf "PORT=8000\nDB_URI=mongodb://writeYourDbUrlHere/yourDbName\n" > .env //* .env dosyasının içini oluştur

/*//! ---------------------------- Initial Commands ---------------------------- */

const express = require("express");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(express.json());

/*//! ------------------------------- QueryParser ------------------------------ */

const queryParser = require("./src/middlewares/queryParser");
app.use(queryParser);

/*//! ---------------------------- PasswordEncrypte ---------------------------- */
const session = require("cookie-session");

app.use(
  session({
    secret: process.env.PASS_SALT,
  })
);

app.use(require("./src/middlewares/userControl"));

/*//! --------------------------------- Routes --------------------------------- */

app.all("/", (req, res) => res.send("Welcome to Blog API By Dzelal")); //* Main Route

app.use("/blogs", require("./src/routes/blog.router")); //* Do not user before creates
app.use("/users", require("./src/routes/user.router")); //* Do not user before creates

/*//! ------------------------------ DB Connection ----------------------------- */

require("./src/dbConnection")(); //* Do not use before create

/*//! ----------------------------- NotFound Route ----------------------------- */

app.use("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "This route not found",
  });
});

/*//! ------------------------------ ErrorHandler ------------------------------ */

app.use(require("./src/middlewares/errorHandler")); //* Do not use before creates

/*//! ------------------------------ Start Server ------------------------------ */

app.listen(PORT, () => console.log(`Running at http://127.0.0.1:${PORT}`));

/*//! ----------------------------- Syncronization ----------------------------- */

// require("./sync")(); //* Run only once
