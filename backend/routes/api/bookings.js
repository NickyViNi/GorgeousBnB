const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { validateBookingDate, endDateNotBeforeStartdate, bookingDateConflict, bookingBelongToCurrentUserCheck, bookingExists, endDateNotPast, bookingOrSpotBelongToCurrentUser, bookingNotStart } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

//(1) GET:Get all of the Current User's Bookings, URL: /api/bookings/current
router.get("/current", requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: {
            model: Spot,
            attributes: {
                exclude: ["description", "createdAt", "updatedAt"]
            }
        }
    });

    const result = [];
    for (let booking of bookings) {
        booking = booking.toJSON();
        booking.Spot.previewImage = "";

        const spotImage = await SpotImage.findOne({
            where: {
                [Op.and]: [
                    { spotId: booking.Spot.id },
                    { preview: true}
                ]
            }
        })

        if (spotImage) {
            booking.Spot.previewImage = spotImage.url;
        }

        result.push(booking);
    };

    res.json({ Bookings: result });

})

//(2) PUT: Edit a Booking, URL: /api/bookings/:bookingId
router.put("/:bookingId", requireAuth, validateBookingDate, bookingExists, endDateNotBeforeStartdate, endDateNotPast, bookingBelongToCurrentUserCheck, bookingDateConflict, async (req, res) => {

    const booking = await Booking.findByPk(req.params.bookingId);

    const updatedBooking = await booking.update(req.body);

    res.json(updatedBooking);

})

//(3) DELETE: Delete a Booking, URL: /api/bookings/:bookingId
//Booking must belong to the current user or the Spot must belong to the current user
router.delete("/:bookingId", requireAuth, bookingExists, bookingOrSpotBelongToCurrentUser, bookingNotStart, async (req, res) => {

    const booking = await Booking.findByPk(req.params.bookingId);
    await booking.destroy();

    res.json({
        message: "Successfully deleted"
    })
})

module.exports = router;
