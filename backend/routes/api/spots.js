const express = require('express');
// const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Booking, Review } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//GET all spots:
router.get( '/', async(req, res) => {
    // const allSpots = await Spot.findAll({ include: SpotImage, include: Review } );

    let allSpots = await Spot.findAll({
      include: [{
        model: Review,
        attributes: ["stars"]
    },
    {
        model: SpotImage,
        attributes: ['url'],
        where: {
            preview: true
        },
        required: false,
        limit: 1
    }]
    })

    return res.json({ Spots: allSpots})

  }
);



module.exports = router;
