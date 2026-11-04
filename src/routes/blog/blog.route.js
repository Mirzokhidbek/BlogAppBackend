const { Router } = require("express");
const blog_router = Router();
const BlogController = require("../../controllers/blog/blog.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { validationRequest } = require("../../validators");
const BlogValidator = require("../../validators/blog/blog.validator");

blog_router.post(
  "/add",
  authMiddleware,
  BlogValidator.create(),
  validationRequest,
  BlogController.createBlog
);
module.exports = blog_router;
