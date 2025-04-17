"use strict";

const router = require("express").Router();
const user = require("../controllers/user.controller");

router.route("/").get(user.list).post(user.create).delete(user.deleteAll);
router.route("/:id").get(user.read).put(user.update).delete(user.delete);
router.post("/login", user.login);
router.post("/logout", user.logout);

module.exports = router;
