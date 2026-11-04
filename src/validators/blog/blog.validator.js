const { body } = require("express-validator");

class BlogValidator {
  static create = () => [
    body("title", "Title is required").notEmpty(),
    body("title", "Title must be a string").isString(),

    body("content", "Content is required").notEmpty(),
    body("content", "Content must be a string").isString(),
  ];
}

module.exports = BlogValidator;
