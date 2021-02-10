const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const broadcastRouter = require("./routes/broadcastRoute");

const app = express();

// setting cors
app.use(cors("*"));

//Body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());

// enabling chat rooms
app.use("/broadcasts", broadcastRouter);

// GLobal error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find requested path: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
