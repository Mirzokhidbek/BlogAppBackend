const { Router } = require("express");
const blog_router = require("./blog/blog.route");
const user_router = require("./user/user.route");
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
  });
});

router.use("/blogs", blog_router);
router.use("/users", user_router);
module.exports = router;
