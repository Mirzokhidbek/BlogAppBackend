const { validationResult } = require("express-validator");
const { StatusCodes, getStatusCode } = require("http-status-codes");
const HttpException = require("../utils/httpException");
const validationRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  let messages = "";
  errors.array().map((err) => {
    messages += err.msg + "! ";
  });
  throw new HttpException(StatusCodes.UNPROCESSABLE_ENTITY, messages.trim());
};
module.exports = { validationRequest };
