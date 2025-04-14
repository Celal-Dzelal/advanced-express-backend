"use strict";

const { BlogCategory, BlogPost } = require("../models/blog.model"); //* We must be careful to import with the same name that we exported from the model folder.

/*//! ------------------------------ BlogCategory ------------------------------ */

module.exports.blogCategory = {
  //* We export an object which name is blogCategory, there are five method in it.
  list: async (req, res) => {
    //* It brings all the categories from the database. If it is success, returns 200 OK answer.
    const result = await BlogCategory.find();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    //* Creates a new category using data from req.body. If successful, returns 201 created.
    const result = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    //* It brings the category which is match the id. req.params.id takes the id which is come from URL. If is success returns 200 Ok.
    const result = await BlogCategory.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    //* It update a specific category. updateOne() finds the id which is match and update with the new value. If is success return 202 Accepted
    const result = await BlogCategory.updateOne(
      { _id: req.params.id },
      req.body
    );
    res.status(202).send({
      error: false,
      result,
      updated: await BlogCategory.findById(req.params.id),
    });
  },
  delete: async (req, res) => {
    //* It deletes the category. findByIdAndDelete() find the id which is match and delete. If id doesn't match it throws 404 error. If is success returns 204 No Content.
    const result = await BlogCategory.findByIdAndDelete(req.params.id);
    if (!result) {
      res.errorStatusCode = 404;
      throw new Error("Data not found or already deleted");
    }
    res.status(204).send({
      error: false,
    });
  },
  deleteAll: async (req, res) => {
    //* It deletes all the category.If is success returns 204 No Content.
    const result = await BlogCategory.deleteMany();
    res.status(204).send({
      error: false,
    });
  },
};

/*//! -------------------------------- BlogPost -------------------------------- */

module.exports.blogPost = {
  //* We export an object which name is blogCategory, there are five method in it.
  list: async (req, res) => {
    //* It brings all the categories from the database. If it is success, returns 200 OK answer.
    const result = await BlogPost.find();
    res.status(200).send({
      error: false,
      result,
    });
  },
  create: async (req, res) => {
    //* Creates a new category using data from req.body. If successful, returns 201 created.
    const result = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      result,
    });
  },
  read: async (req, res) => {
    //* It brings the category which is match the id. req.params.id takes the id which is come from URL. If is success returns 200 Ok.
    const result = await BlogPost.findById(req.params.id);
    res.status(200).send({
      error: false,
      result,
    });
  },
  update: async (req, res) => {
    //* It update a specific category. updateOne() finds the id which is match and update with the new value. If is success return 202 Accepted
    const result = await BlogPost.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      result,
      updated: await BlogPost.findById(req.params.id),
    });
  },
  delete: async (req, res) => {
    //* It deletes the category. findByIdAndDelete() find the id which is match and delete. If id doesn't match it throws 404 error. If is success returns 204 No Content.
    const result = await BlogPost.findByIdAndDelete(req.params.id);
    if (!result) {
      res.errorStatusCode = 404;
      throw new Error("Data not found or already deleted");
    }
    res.status(204).send({
      error: false,
    });
  },
  deleteAll: async (req, res) => {
    //* It deletes all the category.If is success returns 204 No Content.
    const result = await BlogPost.deleteMany();
    res.status(204).send({
      error: false,
    });
  },
};
