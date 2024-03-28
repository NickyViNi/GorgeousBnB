const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { spotIdExists, validateSpotCreate, currentUserOwnSpot, validateSpotImage, validateReview, reviewExists, currentUserNotOwnSpot, validateBookingDate, endDateNotBeforeStartdate, bookingDateConflict, queryFilterParamsValidate } = require('../../utils/validation');
const { Op } = require("sequelize");
const { createQueryObject } = require('../../utils/query-helper');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

const router = express.Router();

//get spots helper function:
const getSpots = async (allSpots) => {
  const spotArray = [];
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

      let previewImage = "Null";
      if (spotImage) { previewImage = spotImage.toJSON().url; }

      let avg = 'New';
      if (starCount) { avg = parseFloat((starSum / starCount).toFixed(1)); }
      // const avgRating = parseFloat((starSum / starCount).toFixed(1));

      spot.avgRating = avg;
      spot.previewImage = previewImage;
      spotArray.push(spot);
    }

    return spotArray;
}

//(1) GET all spots: URL: /api/spots
router.get( '/', queryFilterParamsValidate, async(req, res) => {

    let { page, size } = req.query;

    page = page || 1;
    size = size || 100;

    if (page > 10) { page = 10 };
    if (size > 100) { size = 100 };

    const pagination = {
      limit: size * 1,
      offset: size * (page - 1)
    };

    const queryObj = createQueryObject(req.query);

    const allSpots = await Spot.findAll({
      ...queryObj,
      ...pagination
    });

    const spots = await getSpots(allSpots);

    return res.json({ Spots: spots, page, size});

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

  const spots = await getSpots(userSpots);

  return res.json({ Spots: spots });

})

//(3) GET details of a Spot from an id. URL: /api/spots/:spotId(\\d+)
router.get("/:spotId", spotIdExists, async (req, res) => {
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
  let starsTotal = 0;
  for (let review of spot.Reviews) {
    numReviews++;
    starsTotal += review.stars
  }

  spot.Owner = spot.User;
  spot.numReviews = numReviews;
  spot.avgStarRating = Number((starsTotal / numReviews).toFixed(1));
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

  return res.json({reviews});
})

//(5) GET all Bookings for a Spot based on the Spot's id. URL: /api/spots/:spotId/bookings
router.get("/:spotId/bookings", requireAuth, spotIdExists, async (req, res) => {

  const { spotId } = req.params;

  const spot = await Spot.findByPk(spotId);

  const isSpotOwner = (req.user.id === spot.ownerId);

  const bookings = await ((isSpotOwner? Booking : Booking.scope(["exAttribute"])).findAll({
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
router.post("/", requireAuth, validateSpotCreate, async function(req, res) {
   const { address, city, state, country, lat, lng, name, description, price } = req.body;

  const newSpot = await Spot.create({
    ownerId: req.user.id,
    address, city, state, country, lat, lng, name, description, price
  });

  res.status(201);
  res.json(newSpot);
})

//(7.1) AWS POST: Add an Image to a Spot based on the Spot's id. URL: /api/spots/:spotId/images
router.post("/:spotId/images", requireAuth, singleMulterUpload("url"), validateSpotImage, spotIdExists, currentUserOwnSpot, async (req, res) => {
  const { preview } = req.body;
  const url = req.file ? await singleFileUpload({ file: req.file, public: true}) : null;

  const newSpotImage = await SpotImage.create({
    spotId: req.params.spotId,
    url: url.trim(),
    preview
  });

  const image = {
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview
  }

  res.json(image);

})

//(7.2) URL POST: Add an Image to a Spot based on the Spot's id. URL: /api/spots/:spotId/images/url
router.post("/:spotId/images/url", requireAuth, validateSpotImage, spotIdExists, currentUserOwnSpot, async (req, res) => {
  const { url, preview } = req.body;
  const newSpotImage = await SpotImage.create({
    spotId: req.params.spotId,
    url: url.trim(),
    preview
  });

  const image = {
    id: newSpotImage.id,
    url: newSpotImage.url,
    preview: newSpotImage.preview
  }

  res.json(image);

})


//(8) POST: Create a Booking from a Spot based on the Spot's id. URL: /api/spots/:spotId/bookings
router.post("/:spotId/bookings", requireAuth, validateBookingDate, spotIdExists, currentUserNotOwnSpot, endDateNotBeforeStartdate, bookingDateConflict, async(req, res) => {
  const { startDate, endDate } = req.body;
  const newBooking = await Booking.create({
    spotId: parseInt(req.params.spotId),
    userId: req.user.id,
    startDate,
    endDate
  });

  res.json(newBooking);
})

//(9) POST: Create a Review for a Spot based on the Spot's id. URL: /api/spots/:spotId/reviews
router.post("/:spotId/reviews", requireAuth, validateReview, spotIdExists, reviewExists,  async(req, res) => {

  const { review, stars } = req.body;
  const newReview = Review.build({
    spotId: parseInt(req.params.spotId),
    userId: req.user.id,
    review,
    stars
  });

  await newReview.save();

  res.status(201).json(newReview);

})

//(10) PUT: Edit a Spot. URL: /api/spots/:spotId
router.put("/:spotId", requireAuth, validateSpotCreate, spotIdExists, currentUserOwnSpot,  async (req, res) => {

  const spot = await Spot.findByPk(req.params.spotId);
  await spot.update(req.body);

  res.json(spot);

});

//(11) DELETE a Spot: URL: /api/spots/:spotId
router.delete("/:spotId", requireAuth, spotIdExists, currentUserOwnSpot, async (req, res) => {
  const spot = await Spot.findByPk(parseInt(req.params.spotId));
  console.log("kkkkkk:", spot)
  await spot.destroy();

  res.json({
    message: "Successfully deleted"
  });

});




module.exports = router;
