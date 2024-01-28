const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, ReviewImage, SpotImage} = require('../../db/models');

// const { check } = require('express-validator');
const { validateReview, validateReviewImage, reviewBelongToCurrentUserCheck, reveiwIdExists, maxReviewImageCheck } = require('../../utils/validation');

// const { Sequelize, Op } = require("sequelize");

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
                },
                include: {
                    model: SpotImage,
                    attributes: ["url"],
                    where: { preview: true}
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
        if(rev.Spot.SpotImages.length) {
            rev.Spot.previewImage = rev.Spot.SpotImages[0].url;
            delete rev.Spot.SpotImages;
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
        url: req.body.url.trim()
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
router.delete("/:reviewId", requireAuth, reveiwIdExists, reviewBelongToCurrentUserCheck, async (req, res) => {
    const review = await Review.findByPk(req.params.reviewId);
    await review.destroy();

    res.json({
        message: "Successfully deleted"
    })
})




module.exports = router;
