const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/user.model");
const { genSalt, hash } = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  static signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "user already exists" });
    }

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
  static login = async (req, res) => {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invaid email or password" });
    }
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  };
}
module.exports = UserController;
