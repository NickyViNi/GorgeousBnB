const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Sequelize, Op } = require("sequelize");

const router = express.Router();


//(1) GET all spots: URL: /api/spots
router.get( '/', async(req, res) => {

    const allSpots = await Spot.findAll();
    const Spots = [];

    for (let spot of allSpots) {

      spot = spot.toJSON();
      const starSum = await Review.sum("stars", {
        where: {spotId: spot.id }
      });

      const starCount = await Review.count({
        where: {spotId: spot.id}
      })

      const spotImage = await SpotImage.findOne({
        where: {
          [Op.and]: [
            { spotId: spot.id },
            { preview: true}
          ]
        }
      });

      let previewImage = "";
      if (spotImage) { previewImage = spotImage.toJSON().url; }

      const avgRating = Number((starSum / starCount).toFixed(1));

      spot.avgRating = avgRating;
      spot.previewImage = previewImage;
      Spots.push(spot);
    }

    return res.json({ Spots })

  }
);

//(2) GET all Spots owned by the Current User. URL: /api/spots/current
router.get( '/current', requireAuth, async(req, res) => {
  const user = req.user;
  const userSpots = await Spot.findAll({
    where: {
      ownerId: user.id
    }
  });

  const Spots = [];
  for (let spot of userSpots) {
    spot = spot.toJSON();
      const starSum = await Review.sum("stars", {
        where: {spotId: spot.id }
      });

      const starCount = await Review.count({
        where: {spotId: spot.id}
      })

      const spotImage = await SpotImage.findOne({
        where: {
          [Op.and]: [
            { spotId: spot.id },
            { preview: true}
          ]
        }
      });

      let previewImage = "";
      if (spotImage) { previewImage = spotImage.toJSON().url; }

      const avgRating = Number((starSum / starCount).toFixed(1));

      spot.avgRating = avgRating;
      spot.previewImage = previewImage;
      Spots.push(spot);
  }

  return res.json({ Spots });

})

//(3) GET details of a Spot from an id. URL: /api/spots/:spotId
router.get("/:spotId(\\d+)", async (req, res) => {
  const { spotId } = req.params;
  let spot = await Spot.findByPk(spotId, {
    include: [
      {
        model: Review,
        attributes: ['stars']
      },
      {
        model: SpotImage,
        attributes: ['id', 'url', 'preview']
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ]
  });

  spot = spot.toJSON();

  let numReviews = 0;
  let avgRating = 0;
  for (let review of spot.Reviews) {
    numReviews++;
    avgRating += review.stars
  }

  spot.Owner = spot.User;
  spot.numReviews = numReviews;
  spot.avgRating = Number((avgRating / numReviews).toFixed(1));
  delete spot.User;
  delete spot.Reviews;

  // console.log("kkk: ", spot)
  if (!spot) { return res.json({
    "message": "Spot couldn't be found"
  })}
  return res.json(spot);
})

//(4) GET all Reviews by a Spot's id. URL: /api/spots/:spotId/reviews
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  const reviews = await Review.findAll(
    { where: { spotId: spotId } ,

    include: [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      },
      {
        model: ReviewImage,
        attributes: ['id', 'url']
      }
    ]
  });

  if (!reviews.length) {
    return res.json({
      "message": "Spot couldn't be found"
    })
  }

  return res.json({reviews});
})

//(5) GET all Bookings for a Spot based on the Spot's id. URL: /api/spots/:spotId/bookings

//(6) POST: creat a spot. URL: /api/spots

//(7) POST: Add an Image to a Spot based on the Spot's id. URL: /api/spots/:spotId/images

//(8) POST: Create a Booking from a Spot based on the Spot's id. URL: /api/spots/:spotId/bookings

//(9) POST: Create a Review for a Spot based on the Spot's id. URL: /api/spots/:spotId/reviews

//(10) PUT: Edit a Spot. URL: /api/spots/:spotId

//(11) DELETE a Spot: URL: /api/spots/:spotId




module.exports = router;
