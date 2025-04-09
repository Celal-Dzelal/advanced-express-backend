# Initial Commands

- To set up a basic Node.js project, you need to run the following commands:

```
npm init -y // Initialize npm package

npm i -D nodemon // Install necessary development dependencies

npm i express dotenv // Install core dependencies

npm i express-async-errors // Install express-async-errors for async error handling

npm i sequelize
npm i sqlite3 // Install Sequelize and SQLite3

echo PORT=8000 > .env // Create .env file to set environment variables
```

# Express Start

- To begin, we first import and initialize express and set up basic configuration.

```
const express = require("express");
const app = express();
```

# dotenv Configuration

- dotenv allows us to manage environment variables. The environment variable PORT is read from the .env file, and if it's not found, the default value 8000 is used.

```
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
```

# Model Definition (Sequelize)

- Sequelize models represent database tables. Every model corresponds to a table in the database, and each model's attributes map to the columns in that table.

```
const Todo = sequelize.define("todos", {
  title: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  description: DataTypes.STRING,  // Shorthand for single attribute
  priority: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
```

- **title:** The title of the Todo item. It cannot be null.

- **description:** A description of the Todo item. It can be null.

- **priority:** A priority value for the Todo item (tiny integer). It defaults to 0 and cannot be null.

- **isDone:** A boolean value indicating if the task is completed. It defaults to false and cannot be null.

# Synchronization

- Sequelize needs to synchronize the model with the database. Use the following method to create tables if they don't exist, or alter existing ones.

```
sequelize.authenticate()
  .then(() => console.log("* DB Connected"))
  .catch(() => console.log("* DB Not Connected"));
```

- To sync the model with the database:

```
sequelize.sync();  // Creates the table if it doesn't exist
// sequelize.sync({ force: true });  // Drops the table if it exists and recreates it
// sequelize.sync({ alter: true });  // Alters the table schema if necessary
```

# Error Handling with Express and Async Errors

- express-async-errors is used to handle async errors. It enables seamless error handling in async routes without the need for explicit try-catch blocks.

```
require("express-async-errors");

const errorHandler = (err, req, res, next) => {
  console.log("Errorhandler Worked");
  const customErrorCode = res?.customErrorCode || 500;
  res.status(customErrorCode).send({
    error: true,
    message: err.message,
  });
};

app.use(errorHandler);
```

# JSON Body Parsing

- To accept JSON data in requests, we use the following middleware:

```
app.use(express.json());
```

- This will automatically parse incoming JSON payloads.

# CRUD Operations with Sequelize

- In this example, we create a simple Todo API with the following CRUD (Create, Read, Update, Delete) operations using Sequelize.

```
const router = express.Router();
app.use(router);
```

## Create (POST)

```
router.post("/todos", async (req, res) => {
  const result = await Todo.create(req.body);
  res.status(201).send({
    error: false,
    result: result,
  });
});
```

## Read (GET)

- To get a list and count of all Todos:

```
router.get("/todos", async (req, res) => {
  const result = await Todo.findAndCountAll();  // List and count all Todos
  res.status(200).send({
    error: false,
    result,
  });
});
```

- To get a Todo by ID:

```
router.get("/todos/:id", async (req, res) => {
  const result = await Todo.findByPk(req.params.id);  // Find Todo by primary key (ID)
  // const result = await Todo.findOne({ where: { id: req.params.id } }); // It gives the same result as above
  res.status(201).send({
    error: false,
    result,
  });
});
```

## Update (PUT)

```
router.put("/todos/:id", async (req, res) => {
  const result = await Todo.update(req.body, { where: { id: req.params.id } });
  res.status(202).send({
    error: false,
    result,
    updated: await Todo.findByPk(req.params.id),
  });
});
```

## Delete (DELETE)

```
router.delete("/todos/:id", async (req, res) => {
  const result = await Todo.destroy({ where: { id: req.params.id } });

  if (result) {
    res.sendStatus(204);  // No content, indicating successful deletion
  } else {
    res.customErrorCode = 404;
    throw new Error("Data is not found or already deleted");
  }
});
```

### Running the Server

```
app.listen(PORT, () => console.log(`Running: http://127.0.0.1:${PORT}`));
```
