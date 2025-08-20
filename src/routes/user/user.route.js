const { Router } = require("express");
const UserController = require("../../controllers/user/user.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const { validationRequest } = require("../../validators");
const UserValidator = require("../../validators/user/user.validator");

const user_router = Router();

user_router.post(
  "/signup",
  UserValidator.signUp(),
  validationRequest,
  UserController.signUp
);
user_router.post(
  "/login",
  UserValidator.login(),
  validationRequest,
  UserValidator.login
);
user_router.get("/me", authMiddleware, UserController.getUserProfile);

module.exports = user_router;
