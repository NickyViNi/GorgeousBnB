// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { Spot } = require("../db/models");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
//"check" is a middleware function creator that checks a particular key on the request body. "validationResult" gathers the results of all the "check" middlewares that were run to determine which parts of the body are valid and invalid.
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors
      .array()
      .forEach(error => errors[error.path] = error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }

  next();
};

//middleware for checking spotId is existed:
const spotIdExists = async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    const error = new Error("Spot couldn't be found");
    res.status(404);
    return res.json({ message: error.message });
  }

  next();
}

module.exports = {
  handleValidationErrors,
  spotIdExists
};
