const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
const router = express.Router();
app.use(router);

/* -------------------------------------------------------------------------- */

router
  .route("/")
  .get((req, res) => res.send({ type: "Chain Route", method: "GET" }))
  .post((req, res) => res.send({ type: "Chain Route", method: "POST" }))
  .delete((req, res) => res.send({ type: "Chain Route", method: "DELETE" }));

/* -------------------------------------------------------------------------- */

app.all(/^.*$/, (req, res, next) => {
  const err = new Error("Sayfa bulunamadı!");
  err.statusCode = 404;
  next(err);
});

/* -------------------------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
  console.log("Errorhandler Worked");
  const errorCode = err.statusCode || 500;
  res.status(errorCode).send({
    error: true,
    message: err.message,
  });
};

app.use(errorHandler);

/* -------------------------------------------------------------------------- */

app.listen(PORT, () => console.log(`Running at http://127.0.0.1:${PORT}`));
