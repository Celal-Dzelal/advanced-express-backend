"use strict";

const mongoose = require("mongoose"); //* Import mongoose

/*//! ----------------------------- BlogCategory ---------------------------- */

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String, //* Field must be a string
      trim: true, //* Trims white space from strings
      required: true, //* //* Field is mandatory
      unique: true, //* Creates a unique
    },
  },
  {
    collection: "blogCategories",
    timestamps: true,
  }
);

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema); //* Convert the schema to a model. You can import the model with a "BlogCategory" name.

/*//! -------------------------------- BlogPost -------------------------------- */

const blogPostSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "blogPost", timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

/*//! --------------------------------- Exports -------------------------------- */
module.exports = { BlogCategory, BlogPost };
