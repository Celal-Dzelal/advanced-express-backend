"use strict";

const crypto = require("node:crypto");

module.exports = (password) => {
  const salt = process.env.PASS_SALT;
  const iteration = parseInt(process.env.PASS_ITERATION);
  const keylen = parseInt(process.env.PASS_KEYLEN);
  const digest = process.env.PASS_DIGEST;

  return crypto
    .pbkdf2Sync(password, salt, iteration, keylen, digest)
    .toString("hex");
};
