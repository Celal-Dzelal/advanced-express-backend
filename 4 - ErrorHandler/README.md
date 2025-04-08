# Project Setup (Initial Setup)

- To start the project, you can use the following commands to install the necessary packages:

```
npm init -y  # Initialize the project and create package.json
npm i -D nodemon  # Install Nodemon for automatic reloading during development
npm i express dotenv  # Install Express and Dotenv packages
npm i express-async-errors  # Install this package to handle asynchronous errors (Since the express-async-errors package is not compatible with express5, express5 users cannot install this package. Since express5 already supports async/await natively, it is sufficient to add a global error middleware.)
echo PORT=8000 > .env  # Add the PORT=8000 value to the .env file
```

# Starting Express (Express Start)

- To start your Express application, follow these steps:

```
const express = require("express");  // Import Express
const app = express();  // Initialize the Express application
```

- To load environment variables, we use dotenv:

```
require("dotenv").config();  // Load variables from .env file
const PORT = process.env?.PORT || 8000;  // Get the PORT value from .env or default to 8000
```

# Error Management

## Basic Error Management (Basic Error Handling)

- You can throw errors using the throw statement, which sends an error message to the client.

```
app.get("/", (req, res) => {
  throw new Error("Error Occured", { cause: "The Cause of the Error XXX" });
});
```

## Using Try-Catch for Error Management

- You can catch errors using try-catch blocks. However, note that the error may be lost if it is caught inside the catch block, and the original error may not be captured.

```
app.get("/user/:id", (req, res) => {
  try {
    if (isNaN(req.params.id)) {
      throw new Error("Id must be a numeric");
    } else {
      res.send("Id is okay");
    }
  } catch (err) {
    res.status(500).send({ message: "Error Occured" });
  }
});
```

## Using Try-Catch and ErrorHandler Together

- You can catch errors using try-catch and then pass them to the next error handler using next(err)

```
app.get("/user/:id", (req, res, next) => {
  try {
    if (isNaN(req.params.id)) {
      throw new Error("Id must be a numeric");
    } else {
      res.send("Id is okay");
    }
  } catch (err) {
    next(err);  // Pass the error to the next error handler
  }
});
```

## Asynchronous Error Management

- In asynchronous functions, error handling is a bit different. You can use the express-async-errors package to handle asynchronous errors as well.

```
require("express-async-errors");  // Include the express-async-errors package at the beginning of the project
```

- An example of handling asynchronous errors:

```
app.get("/async", async (req, res, next) => {
  res.customErrorCode = 404;
  throw new Error("404 - Page Not Found", { cause: "Error Reason" });
});
```

## Error Handler

- The Express.js error handler is used to catch and manage errors across the application. It takes four parameters: err, req, res, and next.
- The error handler is called after all other routes and middlewares. This ensures that all errors are caught and processed appropriately.

```
const errorHandler = (err, req, res, next) => {
  console.log("Errorhandler Worked");
  const customErrorCode = res?.customErrorCode || 500;  // Set the error code
  res.status(customErrorCode).send({
    error: true,
    message: err.message,  // Send the error message
    // cause: err.cause,  // Optionally show the cause of the error
    // stack: err.stack,  // Optionally show the error stack trace
  });
};

app.use(errorHandler);  // Add the error handler to the application
```

### Listen

```
app.listen(PORT, () => console.log(`Running at:http://127.0.0.1:${PORT}`))
```
