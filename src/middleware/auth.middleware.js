const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/secrets");
const UserModel = require("../models/user/user.model");
const HttpException = require("../utils/httpException"); // adjust path if needed

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }

    const parts = authorization.split(" ");
    const token = parts.length === 2 ? parts[1] : null;

    if (!token) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      // invalid or expired token
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED
      );
    }

    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        "User not found or unauthorized"
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err); // forward to your error handler that uses statusCode/message
  }
};

module.exports = authMiddleware;
