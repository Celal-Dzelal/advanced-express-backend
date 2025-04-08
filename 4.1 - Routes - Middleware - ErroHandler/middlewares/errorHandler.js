"use strict";

module.exports = (err, req, res, next) => {
  const errorStatusCode = err.errorStatusCode ?? 500;
  console.log("errorHandler Worked");
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};
