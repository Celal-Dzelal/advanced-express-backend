"use strict";

module.exports = (err, req, res, next) => {
  console.log("Error Handler Worked");
  const errorStatusCode = res.errorStatusCode || 500;
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};
