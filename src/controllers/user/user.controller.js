const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/user.model");
const { genSalt, hash } = require("bcryptjs");

class UserController {
  static signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const salt = await genSalt(10);
    const hashePassword = await hash(password, salt);
    await UserModel.create({
      name,
      email,
      password: hashePassword,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully!" });
  };
}
module.exports = UserController;
