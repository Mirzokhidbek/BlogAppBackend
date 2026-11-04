const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/user.model");
const { genSalt, hash, compare } = require("bcryptjs"); // ✅ compare qo‘shildi
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../utils/secrets");
const HttpException = require("../../utils/httpException");

class UserController {
  static signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new HttpException(StatusCodes.CONFLICT, "User already exists");
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt); // ✨ typo: hashePassword -> hashedPassword

    await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully!" });
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const isMatch = await compare(password, user.password); // ✅ compare ishlatildi

    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(StatusCodes.OK).json({ token }); // ✅ fix
  };

  static getUserProfile = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
  };
}

module.exports = UserController;
