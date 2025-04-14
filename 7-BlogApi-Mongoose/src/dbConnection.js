"use strict";

const mongoose = require("mongoose"); //* You're importing Mongoose.

const dbConnection = () => {
  //* You define a function called dbConnection. Inside it, you're reading the DB_URI from the .env file using process.env.DB_URI.
  const URI = process.env.DB_URI;
  if (!URI) throw new Error("!!! DB URI not found"); //* You're making sure that the URI is defined before trying to connect.
  mongoose
    .connect(URI) //* This is the actual connection logic using mongoose.connect(URI).
    .then(() => console.log("**DB Connected**"))
    .catch((err) => console.log("!!DB NOT CONNECTED!!", err));
};

module.exports = dbConnection; //* This allows other files (like your main server.js or app.js) to import and execute this connection function.
