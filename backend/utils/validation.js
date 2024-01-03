// backend/utils/validation.js
const { validationResult } = require('express-validator');
const { Spot, Review } = require("../db/models");
const { check } = require("express-validator");
const { Op } = require("sequelize");

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

//Check Spot is belong to the current user:
const currentUserOwnSpot = async (req, res, next) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if ( req.user.id !== spot.ownerId) {
    const error = new Error("Spot must belong to the current user");
    res.status(403);
    return res.json({
      message: error.message
    })
  }

  next();
}

// Check a spot is valid or not
const validateSpotCreate = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists( { checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists( { checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists( { checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),
  check("lat")
    .exists( { checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists( { checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is not valid"),
  check("name")
    .exists( { checkFalsy: true })
    .isLength( { min: 1, max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists( { checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists( { checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Price per day is required and should be greater than 0"),
  handleValidationErrors
]

// Check an image is valid:
const validateSpotImage = [
  check('url')
   .exists({ checkFalsy: true})
  //  .isURL()
   .withMessage("Please provide a valid url"),
  check('preview')
   .exists()
   .isBoolean()
   .withMessage("Boolean value of preview is require"),
  handleValidationErrors
]

/* { checkFalsy: true } within the .exists() method instructs the validation to consider both undefined and false values as "non-existent" for the purposes of the validation check. */
/* If there's nothing within the .exists() method, it defaults to only checking for undefined values. */
// Check a review is valid:
const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min:1, max: 5})
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

//Check Review from the current user exists for the Spot
const reviewExists =  async (req, res, next) => {
  const review =  await Review.findOne({
    where: {
      [Op.and]: [
        { userId: req.user.id },
        { spotId: req.params.spotId }
      ]
    }
  });

  if (review) {
    const err = new Error("User already has a review for this spot");
    res.status(500);
    return res.json({ message: err.message });
  }

  next();
}

module.exports = {
  handleValidationErrors,
  spotIdExists,
  validateSpotCreate,
  currentUserOwnSpot,
  validateSpotImage,
  validateReview,
  reviewExists,
};
