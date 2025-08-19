const { Router } = require("express");
const UserController = require("../../controllers/user/user.controller");

const user_router = Router();

user_router.post("/signup", UserController.signUp);
user_router.post("/login", UserController.login);

module.exports = user_router;
