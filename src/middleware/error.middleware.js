const errorMiddleware = (err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      message,
      status_code: statusCode,
    },
  });
};

module.exports = errorMiddleware;
