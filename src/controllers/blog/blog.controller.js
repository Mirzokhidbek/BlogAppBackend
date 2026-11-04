const { StatusCodes } = require("http-status-codes");
const BlogModel = require("../../models/blog/blog.model");

class BlogController {
  static createBlog = async (req, res) => {
    const { title, content } = req.body;
    await BlogModel.create({ title, content, author: req.user._id });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Blog created succesfully" });
  };
}
module.exports = BlogController;
