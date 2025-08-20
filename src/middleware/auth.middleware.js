const {
  StatusCodes,
  ReasonPhrases,
  UNAUTHORIZED,
} = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/secrets");
const UserModel = require("../models/user/user.model");

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases });
  }
  const token = authorization.split(" ")[1];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (!decoded) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  const user = await UserModel.findById(decoded.id).select("-password");

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "User not found or unauthorized" });
  }
  req.user = user;
  next();
};

module.exports = authMiddleware;
