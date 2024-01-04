const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { validateBookingDate, reviewImageExists, reviewBelongToCurrentUserCheck } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

//(1)DELETE: Delete a Review Image, URL: /api/review-images/:imageId
router.delete("/:imageId", requireAuth, reviewImageExists, reviewBelongToCurrentUserCheck, async (req, res) => {

    const reviewImage = await ReviewImage.findByPk(req.params.imageId);
    await reviewImage.destroy();

    res.json({
        message: "Successfully deleted"
    });
})



module.exports = router;
