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

# ✅ Using app.route() vs express.Router()

```
app.route("/").get((req, res) => res.send({...}));
```

- app.route() allows you to handle multiple HTTP methods on the same route.
- Suitable for small-scale applications, but not scalable in large apps.

```
const router = express.Router();

router.get("/", (req, res) => res.send({...}));    // Handle GET
router.post("/", (req, res) => res.send({...}));   // Handle POST
router.delete("/", (req, res) => res.send({...})); // Handle DELETE
```

- This is a modular approach and is recommended for better structure and separation of concerns.

# 🔗 Chain Route Methods

```
router.route("/")
  .get((req, res) => res.send({...}))
  .post((req, res) => res.send({...}))
  .delete((req, res) => res.send({...}));
```

- Clean and efficient way to define multiple methods on the same route.
- Improves readability and maintenance.

# 🧠 Mounting the Router in Your App

```
app.use(router);
```

- Works fine, but better to use a base path (prefix):

```
app.use("/api", router); // All routes now start with /api
```

## 📁 Routes in a Separate File (e.g., ./routes/index.js)

````
const router = require("express").Router();
// It creates a modular routing object from Express to define routes separately from the main app.

router.route("/")
  .get((req, res) => res.send({...}))
  .post((req, res) => res.send({...}))
  .delete((req, res) => res.send({...}));

module.exports = router;```
````

## 📥 Importing the Router in app.js or server.js

```
const router = require("./routes");
app.use("/api", router);
```

- Keeps your routes organized and scalable.
- You can also split routes into multiple files (e.g., /users, /products).

### Listen

```
app.listen(PORT, () => console.log(`Running at:http://127.0.0.1:${PORT}`))
```
