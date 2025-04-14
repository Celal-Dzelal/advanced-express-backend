"use strict";

module.exports = (err, req, res, next) => {
  //* This is a custom error-handling middleware in Express. It must have four parameters: (err, req, res, next) — this is how Express knows it's for error handling.
  console.log("!!! Warning, ErrorHandler Worked !!!"); //* Just a log to confirm that the error handler was actually triggered. Helpful for debugging.
  const errorStatusCode = res?.errorStatusCode || 500; //* This checks if res.errorStatusCode exists (maybe set in a controller or route). If not, defaults to 500 (Internal Server Error).
  res.status(errorStatusCode).send({
    error: true, //*  Marks that an error occurred
    message: err.message, //* The main error message
    // cause: err.cause, //* Cause of the error
    // stack: err.stack, //* Shows where the error came from (useful in dev, but not in production for security reasons)
  });
};
