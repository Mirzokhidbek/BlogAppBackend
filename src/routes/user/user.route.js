const { Router } = require("express");
const UserController = require("../../controllers/user/user.controller");
const authMiddleware = require("../../../middleware/auth.middleware");

const user_router = Router();

user_router.post("/signup", UserController.signUp);
user_router.post("/login", UserController.login);
user_router.get("/me", authMiddleware, UserController.getUserProfile);

module.exports = user_router;
