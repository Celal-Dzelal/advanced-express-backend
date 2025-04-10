# Setup Project Environment

- Before creating the files, let's start by setting up the project environment.

- Initialize your Node.js project with

```
npm init -y
```

- Install required dependencies:

```
npm i express dotenv express-async-errors sequelize sqlite3
npm i -D nodemon
```

- Create a .env file to store environment variables:

```
PORT=8000
SQLITE=./db.sqlite3
```

# Create app.js

```
"use strict";

// Required modules
const express = require("express");
const app = express();

// Load environment variables
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// Enable async error handling
require("express-async-errors");

// Middleware to accept JSON data
app.use(express.json());

// Main route
app.all("/", (req, res) => {
  res.send("Welcome To TODO Api");
});

// Import routes and error handler
app.use(require("./routes/todo.router"));
app.use(require("./middlewares/errorHandler"));

// Start the server
app.listen(PORT, () => console.log(`Running: http://127.0.0.1:${PORT}`));
```

- This file sets up the basic Express application, enabling JSON parsing for incoming requests.

- It imports routing and error-handling middleware.

- The server listens on the port defined in .env.

# Create models/todo.model.js

- This file will define the Sequelize model for your Todo table in the database.

```
"use strict";

// Import Sequelize and DataTypes
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`sqlite:${process.env.SQLITE}`);  //* Connect to SQLite database

// Define the Todo model
const Todo = sequelize.define("todos", {
  title: {
    type: DataTypes.STRING(256),
    allowNull: false,  //* Title cannot be null
  },
  description: DataTypes.STRING,  //* Optional description
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,  //* Default priority is 0
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,  //* Default isDone value is false
  },
});

// Syncronization

// sequelize.sync()

// Test database connection
sequelize.authenticate()
  .then(() => console.log("* DB Connected"))
  .catch(() => console.log("* DB Not Connected"));

module.exports = Todo;
```

- This file defines the Todo model, specifying the attributes such as title, description, priority, and isDone.

- The connection to the SQLite database is established using Sequelize.

# Create controllers/todo.controller.js

- This file contains the CRUD operations for the Todo model.

```
"use strict";

const Todo = require("../models/todo.model");  //* Import the Todo model

module.exports = {
  // List all Todos
  list: async (req, res) => {
    const result = await Todo.findAndCountAll();  //* Retrieve all Todos and count them
    res.status(200).send({
      error: false,
      result,
    });
  },

  // Create a new Todo
  create: async (req, res) => {
    const result = await Todo.create(req.body);  //* Create Todo from request body
    res.status(201).send({
      error: false,
      result,
    });
  },

  // Read a single Todo by ID
  read: async (req, res) => {
    const result = await Todo.findByPk(req.params.id);  //* Find Todo by primary key (ID)
    res.status(201).send({
      error: false,
      result,
    });
  },

  // Update an existing Todo
  update: async (req, res) => {
    const result = await Todo.update(req.body, {
      where: { id: req.params.id },  //* Update the Todo where ID matches
    });
    res.status(202).send({
      error: false,
      result,
      updated: await Todo.findByPk(req.params.id),  //* Return updated Todo
    });
  },

  // Delete a Todo by ID
  delete: async (req, res) => {
    const result = await Todo.destroy({ where: { id: req.params.id } });  //* Delete Todo
    if (result) {
      res.sendStatus(204);  //* Successfully deleted, no content to return
    } else {
      res.customErrorCode = 404;
      throw new Error("Data is not found or already deleted");
    }
  },
};
```

- This file contains methods for handling CRUD operations on Todos.

  - **list:** Retrieves all Todos.
  - **create:** Creates a new Todo.
  - **read:** Fetches a single Todo by ID.
  - **update:** Updates an existing Todo by ID.
  - **delete:** Deletes a Todo by ID.

# Create routes/todo.router.js

- This file defines the routes that will map to the controller methods for CRUD operations.

```
"use strict";

const router = require("express").Router();
const todoController = require("../controllers/todo.controller");

// Routes for listing and CRUD

router.route("/todos").get(todo.list).post(todo.create);

router.route("/todos/:id").get(todo.read).put(todo.update).delete(todo.delete);

module.exports = router;
```

- This file defines routes for each CRUD operation on todos.

- The /:id route allows for operations on individual Todo items (read, update, delete).

# Create middlewares/errorHandler.js

- This file defines the custom error handler to manage errors that occur during API requests.

```
"use strict";

module.exports = (err, req, res, next) => {
  console.log("Errorhandler Worked");
  const customErrorCode = res?.customErrorCode || 500;  //* Default to 500 if no custom error code is set
  res.status(customErrorCode).send({
    error: true,
    message: err.message,  //* Send the error message in the response
  });
};
```

- This middleware catches errors and formats the response.

- It logs errors and responds with a message and a status code (default 500).

## Final Notes on File Creation Order

- **app.js:** Always create the entry point first. It sets up Express and server configuration.

- **models/todo.model.js:** Define the Sequelize model next to ensure the database schema is ready.

- **controllers/todo.controller.js:** Create controllers to handle business logic for Todo operations.

- **routes/todo.router.js:** Define routes for your API to map to the controller methods.

- **middlewares/errorHandler.js:** Finally, define your error-handling middleware.
