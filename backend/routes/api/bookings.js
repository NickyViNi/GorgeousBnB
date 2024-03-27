const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { validateBookingDate, endDateNotBeforeStartdate, bookingDateConflict, bookingBelongToCurrentUserCheck, bookingExists, endDateNotPast, bookingOrSpotBelongToCurrentUser, bookingNotStart } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

//(0) GET:Get all of the Spot Owner's Bookings, URL: /api/bookings/owner
router.get("/owner", requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: { ownerId: req.user.id },
        attributes: ["id"]
    });

    let bookings = [];

    for (let spot of spots) {
        const spotBookings = await Booking.findAll({
            where: { spotId: spot.id },
            include: {
                model: Spot,
                include: {
                    model: SpotImage,
                    attributes: ["url"],
                    where: { preview: true }
                },
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                }
            }
        });
        bookings.push(...spotBookings);
    }

    res.json({ Bookings: bookings });
})

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
router.put("/:bookingId", requireAuth, validateBookingDate, bookingExists, endDateNotBeforeStartdate, endDateNotPast, bookingOrSpotBelongToCurrentUser, bookingNotStart, bookingDateConflict, async (req, res) => {

    const booking = await Booking.findByPk(req.params.bookingId);

    await booking.update(req.body);

    const updatedBooking = await Booking.findByPk(req.params.bookingId, {
        include: {
            model: Spot,
            include: {
                model: SpotImage
            },
            attributes: {
                exclude: ["description", "createdAt", "updatedAt"]
            }
        }
    });
    const result = updatedBooking.toJSON();

    result.Spot.previewImage = result.Spot.SpotImages[0].url;
    delete  result.Spot.SpotImages;
    res.json(result);

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
