const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: for ${err.value} `;
  return new AppError(message, 400);
};

const handleDuplicateFIeldsDB = (err) => {
  let value = JSON.stringify(err.keyValue).replace(/[\()"]/g, " ");
  const message = `Duplicate Fields on: ${value}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other errors
  } else {
    console.error("⚡⚡⚡   Error   ⚡⚡⚡", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.kind === "ObjectId") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFIeldsDB(error);
    sendErrorProd(error, res);
  }
};