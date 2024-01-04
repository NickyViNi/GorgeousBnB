const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { validateBookingDate, endDateNotBeforeStartdate, bookingDateConflict } = require('../../utils/validation');

// const { Sequelize, Op } = require("sequelize");

const router = express.Router();

//(1) GET:Get all of the Current User's Bookings, URL: /api/bookings/current
router.get("/current", requireAuth, async (req, res) => {

})


module.exports = router;
