"use strict";

const router = require("express").Router();

const { blogCategory, blogPost } = require("../controllers/blog.controller");

/*//! ------------------------------ blogCategory ------------------------------ */

router
  .route("/category")
  .get(blogCategory.list)
  .post(blogCategory.create)
  .delete(blogCategory.deleteAll);

router
  .route("/category/:id")
  .get(blogCategory.read)
  .put(blogCategory.update)
  .delete(blogCategory.delete);

/*//! -------------------------------- blogPost -------------------------------- */

router
  .route("/post")
  .get(blogPost.list)
  .post(blogPost.create)
  .delete(blogPost.deleteAll);

router
  .route("/post/:id")
  .get(blogPost.read)
  .put(blogPost.update)
  .delete(blogPost.delete);

/*//! --------------------------------- Export --------------------------------- */

module.exports = router;
