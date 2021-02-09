const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController');
const chatRouter = require('./routes/chatRoute')


const app = express();

// setting cors
app.use(
  cors({
    credentials: true,
    origin: '*'
  })
);

//Body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());

// enabling chat rooms
app.use('/chat', chatRouter)


// GLobal error handling
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find requested path: ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);

module.exports = app;