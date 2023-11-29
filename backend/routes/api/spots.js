const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking, Review } = require('../../db/models');

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

      const previewImage = spotImage.toJSON().url;
      const avgRating = Number((starSum / starCount).toFixed(1));

      spot.avgRating = avgRating;
      spot.previewImage = previewImage;
      Spots.push(spot);
    }

    return res.json({ Spots })

  }
);



module.exports = router;
