const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { ValidationError } = require('sequelize');

const { environment } = require('./config');
const isProduction = environment === 'production';

//Initialize the Express application:
const app = express();

//Connect the morgan middleware for logging information about requests and responses:
app.use(morgan('dev'));

//Add the cookie-parser middleware for parsing cookies
app.use(cookieParser());
//for parsing JSON bodies of requests with Content-Type of "application/json"
app.use(express.json());

 // Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
);

  // Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message: "The requested resource couldn't be found." };
    err.status = 404;
    next(err);
  });

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      let errors = {};
      for (let error of err.errors) {
        errors[error.path] = error.message;
        if (error.message === "email must be unique") {
          errors[error.path] = "User with that email already exists";
          err.message = 'User already exists';
        }

        if (error.message === "username must be unique") {
          errors[error.path] = "User with that username already exists";
          err.message = 'User already exists';
        }
      }
      err.title = 'Validation error';
      err.errors = errors;
    }
    next(err); //next invoked with nothing means that error handlers defined after this middleware will not be invoked. However, next invoked with an error means that error handlers defined after this middleware will be invoked.
  });

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    // res.json({
    //   title: err.title || 'Server Error',
    //   message: err.message,
    //   errors: err.errors,
    //   stack: isProduction ? null : err.stack
    // });

    const error = {};
    // if(err.title) error.title = err.title;
    if(err.message) error.message = err.message;
    if(err.errors) error.errors = err.errors;
    if(!isProduction) error.stack = err.stack;

    res.json(error);

  });


module.exports = app;
