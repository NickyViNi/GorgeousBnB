const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { validateBookingDate } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();



module.exports = router;
