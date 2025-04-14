# 📁 index.js

## 🔧 Setup Command

```
npm init -y && npm i mongoose express dotenv && npm i -D nodemon
```

_✅ Perfect for initializing the project and installing required dependencies in one go. It includes:_

- mongoose: for MongoDB

- express: for handling HTTP requests

- dotenv: for environment variables

- nodemon: (as a dev dependency) for auto-restarting the server during development

## 📁 .env File

```
printf "PORT=8000\nDB_URI=mongodb://writeYourDbUrlHere/yourDbName\n" > .env
```

_✅ This defines environment variables. Great practice to avoid hardcoding sensitive values like database URLs._

## 🚀 Express Setup

````const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(express.json());```
````

_A standard and clean Express app setup. express.json() middleware is included to handle incoming JSON data._

## 🌐 Routes

`app.all("/", (req, res) => res.send("Welcome to Blog API By Dzelal"));`

_✅ A basic root route — works perfectly to test if your API is up and running._

```
// app.use("/blogs",require("writeYourDocPathHere"))
// app.use("/users",require("writeYourDocPathHere"))
```

_⚠️ These are commented out for now, which is fine. They're placeholders for future route modules like blogs.js and users.js._

## 🛢️ Database Connection

**⚠️ Do not run before created dbConnection, otherwise you'll get an error.**

`require("./src/dbConnection")();`

_You have a dbConnection.js file exporting a function that connects to MongoDB using Mongoose. It's a clean and modular way to handle database connections._

## 🛑 Error Handler Middleware

**⚠️ Do not run before created dbConnection, otherwise you'll get an error.**

`app.use(require("./src/middlewares/errorHandler"));`

_You can define a simple errorHandler.js like this_

# 📁 dbConnection.js

```
// new mongoose.Schema({fields},{options}); //*This is the base syntax: First argument -> field definitions, Second argument -> schema options (like collection name, timestamps, etc.)

const nameOfSchema = new mongoose.Schema(
  {
    //* Simple fields with type definitions — the value must be a number or boolean.
    fieldName: Number,
    fieldName1: Boolean,
    fieldName2: {
      type: String, //* Field must be a string
      default: null, //* Default value if not provided
      trim: true, //* Trims white space from strings
      unique: [true, "custom error message"], //* Creates a unique index; if not unique, returns a custom error message
      select: false, //* Excludes this field from query results unless specifically selected
      index: true, //* Creates an index in MongoDB for faster querying
      required: [true, "custom error message"], //* Field is mandatory; returns custom message if missing
      enum: [["1","2","3"], "custom error message"], //* Value must be one of the given array elements. It could be number also.
      min: 5, //* Minimum value (for numbers) or length (for strings)
      max: 10, //* Maximum value or length
      validate[()=> true, "custom error message"], //* Custom validation function; must return true/false
      get: () => { //* Transforms data after reading from DB
        return data
      },
      set: () => { //* Transforms data before saving to DB
        return data
      }
    },
  },
  {collection: "collectionName", timestamps: true}
//* Sets a custom MongoDB collection name | Automatically adds createdAt and updatedAt fields
);

modul.exports = mongoose.model("ModelName", nameOfSchema)
```
