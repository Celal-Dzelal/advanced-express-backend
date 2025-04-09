# 📘 Express.js – Middleware and Router Structure (Study Notes)

This mini project demonstrates how to build a basic **Express.js** application focusing on:

- The concept of middleware and execution order
- Route structuring
- Passing data from middleware to routes
- Global error handling
- Clean folder structure for scalability

## 📌 1. What Is the Purpose of This Project?

When a user sends a request to the `/` (root) route:

1. `middleware1` runs first → `req.message1 = "Middleware 1"`
2. Then `middleware2` runs → `req.message2 = "Middleware 2"`
3. Finally, the GET route defined in `router.js` is executed → returns a JSON response.

## 🔄 2. Application Flow – Middleware → Route

### ✅ middleware.js

```
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
```

- Each middleware runs in order.

- Middleware can modify the req object.

- If next() is not called, the next function will not be triggered!

### ✅ app.js

```
const { middleware1, middleware2 } = require("./middlewares/middleware");

app.use("/", middleware1, middleware2, require("./routes/router"));
```

- This line ensures that when a request comes to /, both middleware functions run before the route handler.

### ✅ router.js

```
router.get("/", (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
    message: "Middlewares and Router Worked"
  });
});
```

- The route handler can access the data set by middleware through req.

## 🧪 3. Sample Response (GET /)

```
{
  "message1": "Middleware 1",
  "message2": "Middleware 2",
  "message": "Middlewares and Router Worked"
}
```

## 🛑 4. Error Handling (Error Handler)

```
module.exports = (err, req, res, next) => {
  const errorStatusCode = err.errorStatusCode ?? 500;
  console.log("errorHandler Worked");
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
  });
};
```

- If an error is thrown or passed with next(err), this middleware handles it.

- Sends a meaningful error message to the client.

- Must be defined at the end of all app.use() calls in app.js.

### 🎯 8. Key Takeaways

- Middleware functions run in sequence and are connected via next().

- You can pass custom data using the req object.

- Middleware can be used to prepare or filter the request before it reaches the route.

- A global error handler simplifies debugging and user feedback.

- Structuring your code into routes and middleware directories keeps your project clean and scalable.
