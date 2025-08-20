const { body, param, query } = require("express-validator");

class UserValidator {
  static signUp = () => [
    body("email", "Email is required").notEmpty(),
    body("email", "Invalid email format").isEmail(),

    body("password", "Password is required").notEmpty(),
    body(
      "password",
      "Password must be at least 8 characters long, contain lowercase, uppercase letters and numbers"
    ).isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    }),

    body("name", "Name is required").notEmpty(),
    body("name", "Name must be a string").isString(),
  ];
  static login = () => [
    body("email", "Email is required").notEmpty(),
    body("email", "Invalid email format").isEmail(),
    body("password", "Password is required").notEmpty(),
  ];
}

module.exports = UserValidator;
