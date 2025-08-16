const { StatusCodes } = require("http-status-codes");

class UserController {
  static signUp = async (req, res) => {
    const { name, email, password } = req.body;
    await UserModel.create({
      name,
      email,
      password,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User registered successfully!" });
  };
}
module.exports = UserController;
