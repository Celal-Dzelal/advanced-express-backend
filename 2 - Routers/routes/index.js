const router = require("express").Router();

router
  .route("/")
  .get((req, res) => res.send({ method: "GET" }))
  .post((req, res) => res.send({ method: "POST" }))
  .delete((req, res) => res.send({ method: "DELETE" }));

module.exports = router;
