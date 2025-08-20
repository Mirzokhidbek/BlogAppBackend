const { Router } = require("express");
const blog_router = Router();
const BlogController = require("../../controllers/blog/blog.controller");
const authMiddleware = require("../../../middleware/auth.middleware");
blog_router.post("/add", authMiddleware, BlogController.createBlog);
module.exports = blog_router;
