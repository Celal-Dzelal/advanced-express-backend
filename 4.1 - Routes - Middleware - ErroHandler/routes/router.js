const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({
    message1: req.message1,
    message2: req.message2,
    message: "Middlewares and Router Worked",
  });
});
module.exports = router;
