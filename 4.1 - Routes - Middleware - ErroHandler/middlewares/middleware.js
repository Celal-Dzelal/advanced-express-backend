"use strict";
module.exports = {
  middleware1: (req, res, next) => {
    req.message1 = "Middleware 1";
    next();
  },
  middleware2: (req, res, next) => {
    req.message2 = "Middleware 2";
    next();
  },
};
