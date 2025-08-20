const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const validationRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let messages = "";
  errors.array().map((err) => {
    messages += err.msg + "! ";
  });
  return res
    .status(StatusCodes.UNPROCESSABLE_ENTITY)
    .json({ errors: messages.trim() });
};
module.exports = { validationRequest };
