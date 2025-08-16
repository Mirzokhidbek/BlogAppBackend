const { Router } = require("express");
const UserController = require("../../controllers/user/user.controller");

const user_router = Router();
user_router.post("/signup", UserController.signUp),
  (module.exports = user_router);
