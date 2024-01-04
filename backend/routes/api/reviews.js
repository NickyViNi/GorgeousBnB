const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { handleValidationErrors, spotIdExists, validateSpotCreate, currentUserOwnSpot, validateSpotImage, validateReview, reviewExists, currentUserNotOwnSpot, validateBookingDate, endDateNotBeforeStartdate, bookingDateConflict, validateReviewImage, reviewBelongToCurrentUserCheck, reveiwIdExists, maxReviewImageCheck } = require('../../utils/validation');

const { Sequelize, Op } = require("sequelize");

const router = express.Router();


//(1) GET all Reviews of the Current User: URL: /api/reviews/current
router.get( '/current', requireAuth, async(req, res) => {

    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                }
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });

    const result = [];
    reviews.forEach(rev => {
        rev = rev.toJSON();
        rev.Spot.previewImage = "";
        if(rev.ReviewImages.length) {
            rev.Spot.previewImage = rev.ReviewImages[0].url
        }
        result.push(rev);
    });

    res.json({ Reviews: result });
})

//(2) POST:Add an Image to a Review based on the Review's id, URL: /api/reviews/:reviewId/images
router.post("/:reviewId/images", requireAuth, validateReviewImage, reveiwIdExists, reviewBelongToCurrentUserCheck, maxReviewImageCheck, async (req, res) => {
    // const { url } = req.body;

    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: req.body.url
    });

    const newImage = {
        id: newReviewImage.id,
        url: newReviewImage.url
    }

    res.json(newImage);
})

//(3) PUT:Edit a Review, URL: /api/reviews/:reviewId
router.put("/:reviewId", requireAuth, validateReview, reveiwIdExists, reviewBelongToCurrentUserCheck, async (req, res) => {

    const review = await Review.findByPk(req.params.reviewId);
    const updateReview = await review.update(req.body);

    res.json(updateReview);
})


//(4) DELETE: delete a review, URL: /api/reviews/:reviewId





module.exports = router;
