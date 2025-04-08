/*//? ------------------------------ Express Start ----------------------------- */

const express = require("express");
const app = express();

/*//? -------------------------- Environment Variables ------------------------- */

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

/*//? -------------------------------------------------------------------------- */

app.use((req, res, next) => {
  console.log("Middleware Executed!");
  next();
});

/*//? ------------------------------- Main Route ------------------------------- */

app.get("/", (req, res, next) => {
  console.log("Middleware Worked");
  next();
});

/*//? ------------------------------ Passing Data ------------------------------ */

// app.get("/", (req, res, next) => {
//   req.message1 = "Middleware 1";
//   next();
// });
// app.get("/", (req, res, next) => {
//   req.message2 = "Middleware 2";
//   next();
// });
// app.get("/", (req, res, next) => {
//   req.message3 = "Middleware 3";
//   next();
// });
// app.get("/", (req, res) => {
//   //* This is not middleware, because there is no next parameter.
//   res.send({
//     message1: req.message1,
//     message2: req.message2,
//     message3: req.message3,
//     message: "THE END",
//   });
// });  //* The reason we put this block in the comment out is to avoid conflicting with the codes written below.

/*//? -------------------------- Functional Middleware ------------------------- */

//! Since we will import the Functional Middleware from another file, please comment out all the codes here.

// const middleware1 = (req, res, next) => {
//   req.message1 = "Functional Middleware 1 Runs";
//   next();
// };
// const middleware2 = (req, res, next) => {
//   req.message2 = "Functional Middleware 2 Runs";
//   next();
// };

//! Runs for All

// app.use(middleware1);
// app.use(middleware2);

//! Runs Together

// app.use(middleware1, middleware2);

//! Specific Path

// app.use("/api", middleware1, middleware2);

//! Specific Method and Route

// app.get("/api", [middleware1, middleware2]);

//! Route with Handler

// app.get("/", [middleware1, middleware2], (req, res) => {
//   res.send({
//     message1: req.message1,
//     message2: req.message2,
//     message: "The End",
//   });
// });

/*//? --------------------------- Import Middlewares --------------------------- */

const { middleware1, middleware2 } = require("./middlewares");

app.get("/", [middleware1, middleware2], (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
    message: "Importing Functional Middleware is Done",
  });
});

/*//? --------------------------------- Listen --------------------------------- */

app.listen(PORT, () => console.log(`Running At http://127.0.0.1:${PORT}`));
