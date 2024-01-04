const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { handleValidationErrors, spotIdExists, validateSpotCreate, currentUserOwnSpot, validateSpotImage, validateReview, reviewExists, currentUserNotOwnSpot, validateBookingDate, endDateNotBeforeStartdate, bookingDateConflict } = require('../../utils/validation');

const { Sequelize, Op } = require("sequelize");

const router = express.Router();


//(1) GET all Reviews of the Current User: URL: /api/reviews/current
router.get( '/current', requireAuth, async(req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });

    res.json({ Reviews: reviews });
})
