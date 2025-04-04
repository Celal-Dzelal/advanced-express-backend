# 🛠️ Initial Setup

```
npm init -y                   # Create package.json (initialize project)
npm install -D nodemon        # Install nodemon as a dev dependency
npm install express dotenv    # Install express and dotenv
echo PORT=8000 > .env         # Create .env file and set PORT
```

# 🚀 Express Start

```
const express = require("express");       // Import Express
const app = express();                    // Initialize Express app
```

# 🌱 Environment Variables

```
require("dotenv").config();               // Load .env variables
const PORT = process.env?.PORT || 8000;   // Use PORT from .env or fallback to 8000
```

# Middleware

- Functions that run between an HTTP request and the server response.
- Process requests (e.g., logging, authentication), modify data, or alter responses.
- 3 core parameters: (req, res, next)
- Basic Syntax:

```
app.use((req, res, next) => {
  console.log("Middleware executed!");
  next(); // Continue the chain
});
```

## 🔹 Main Route

```
app.get("/", (req, res) => {
  console.log("...");
  res.send({...});
});
```

## ❗ Middleware + next() Conflict

```
app.get("/", (req, res, next) => {
  console.log("Middleware Worked");
  next();
  res.send({...}); // ❌ Error: Cannot send response after calling next()
});
```

- Once you call next(), you must not send a response in the same middleware.

## 🔄 Passing Data Between Middlewares

```
app.get("/", (req, res, next) => {
  req.message1 = "middleware 1";
  next(); //* To the middleware 2
});
app.get("/", (req, res, next) => {
  req.message2 = "middleware 2";
  next(); //* To the middleware 3
});
app.get("/", (req, res, next) => {
  req.message3 = "middleware 3";
  next(); //* To the middleware 4
});
app.get("/", (req, res, next) => {
  req.message4 = "middleware 4";
  next(); //* To the route
});
app.get("/", (req, res) => {
  res.send({
    //* Final
    message1: req.message1,
    message2: req.message2,
    message3: req.message3,
    message4: req.message4,
    message: "The End",
  });
});
```

- ✅ The req object is shared across the middleware chain.

## 🔧 Functional Middleware

```
const middleware1 = (req, res, next) => {
  req.message1 = "middlewareFn-1 runs";
  next();
};
const middleware2 = (req, res, next) => {
  req.message2 = "middlewareFn-2 runs";
  next();
};
```

### 📌 How to Use Functional Middlewares?

1. **Runs for all requests**

```
app.use(middleware1);
app.use(middleware2);
```

2. **Runs together**

```
app.use(middleware1, middleware2);
```

3. **Only for specific path**

```
app.use("/api", middleware1, middleware2);
```

4. **Only for specific method and route**

```
app.get("/api", [middleware1, middleware2]);
```

5. **In a route with handler**

```
app.get("/", [middleware1, middleware2], (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
    message: "The End",
  });
});
```

#### 📁 Middlewares in Separate File

```
// ./middlewares/index.js
module.exports = {
  middleware1: (req, res, next) => {
    req.message1 = "middlewareFn-1 runs";
    next();
  },
  middleware2: (req, res, next) => {
    req.message2 = "middlewareFn-2 runs";
    next();
  },
};
```

#### Imports in app.js

```
// In app.js
const { middleware1, middleware2 } = require("./middlewares");

app.get("/", [middleware1, middleware2], (req, res) => {
 res.send({
   message1: req.message1,
   message2: req.message2,
   message: "The End",
 });
});
```

##### Listen

```
app.listen(PORT, () => console.log(`Running at:http://127.0.0.1:${PORT}`))
```
