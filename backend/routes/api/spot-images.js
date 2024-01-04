const express = require('express');
// const bcrypt = require('bcryptjs');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Booking, Review, ReviewImage} = require('../../db/models');

// const { check } = require('express-validator');
const { currentUserOwnSpot, spotImageExists } = require('../../utils/validation');

const { Op } = require("sequelize");

const router = express.Router();

//(1) DELETE: Delete a Spot Image, URL: /api/spot-images/:imageId
router.delete("/:imageId", requireAuth, spotImageExists, currentUserOwnSpot, async (req, res) => {

    const spotImage = await SpotImage.findByPk(req.params.imageId);
    await spotImage.destroy();

    res.json({
        message: "Successfully deleted"
    });
})



module.exports = router;
