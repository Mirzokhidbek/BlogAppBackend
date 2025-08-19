const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  const { authorization } = req.body;
  if (!authorization) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases });
  }
  const token = authorization.split("")[1];
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: ReasonPhrases.UNAUTHORIZED });
  }
  next();
};
