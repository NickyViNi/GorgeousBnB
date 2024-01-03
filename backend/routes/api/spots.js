const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors, spotIdExists } = require('../../utils/validation');
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

      const avgRating = parseFloat((starSum / starCount).toFixed(1));

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
router.get("/:spotId(\\d+)", spotIdExists, async (req, res) => {
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
  // if (!spot) {
  //   return res.status(404).json({
  //   "message": "Spot couldn't be found"
  //   });
  // }

  spot = spot.toJSON();

  let numReviews = 0;
  let starsTotal = 0;
  for (let review of spot.Reviews) {
    numReviews++;
    starsTotal += review.stars
  }

  spot.Owner = spot.User;
  spot.numReviews = numReviews;
  spot.avgRating = Number((starsTotal / numReviews).toFixed(1));
  delete spot.User;
  delete spot.Reviews;

  return res.json(spot);
})

//(4) GET all Reviews by a Spot's id. URL: /api/spots/:spotId/reviews
router.get("/:spotId/reviews", spotIdExists, async (req, res) => {
  const { spotId } = req.params;

  const reviews = await Review.findAll({
    where: { spotId: spotId },
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

  // if (!reviews.length) {
  //   return res.status(404).json({
  //     "message": "Spot couldn't be found"
  //   })
  // }

  return res.json({reviews});
})

//(5) GET all Bookings for a Spot based on the Spot's id. URL: /api/spots/:spotId/bookings
router.get("/:spotId/bookings", requireAuth, spotIdExists, async (req, res) => {

  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  const isSpotOwner = (req.user.id === spot.ownerId);

  console.log("id: ", req.user.id, " ownerid: ", spot.ownerId, " ", isSpotOwner)

  const bookings = await ((isSpotOwner? Booking.unscoped() : Booking).findAll({
    where: { spotId: spotId },

    include: isSpotOwner? [
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }
    ] : []
  }));

  return res.json({ Bookings: bookings });
})

//(6) POST: creat a spot. URL: /api/spots
router.post("/", requireAuth,  function async (req, res) {

})

//(7) POST: Add an Image to a Spot based on the Spot's id. URL: /api/spots/:spotId/images

//(8) POST: Create a Booking from a Spot based on the Spot's id. URL: /api/spots/:spotId/bookings

//(9) POST: Create a Review for a Spot based on the Spot's id. URL: /api/spots/:spotId/reviews

//(10) PUT: Edit a Spot. URL: /api/spots/:spotId

//(11) DELETE a Spot: URL: /api/spots/:spotId




module.exports = router;
