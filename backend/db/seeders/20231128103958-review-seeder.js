'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review } = require('../models');
// const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 8,
        review: 'Not too bad.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 7,
        review: 'Great spot, highly recommand.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 6,
        review: 'Do not recommand this spot.',
        stars: 2
      },
      {
        spotId: 4,
        userId: 5,
        review: "I do not like this spot.",
        stars: 3
      },
      {
        spotId: 5,
        userId: 4,
        review: 'I love this wonderful spot.',
        stars: 5
      },
      {
        spotId: 6,
        userId: 3,
        review: "I love this gorgeous spot.",
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: "It's such a fantastic spot.",
        stars: 5
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Enjoying living in this beautiful castle!',
        stars: 5
      },
      {
        spotId: 9,
        userId: 8,
        review: "It was not worth spending so much money to live in this castle.",
        stars: 4
      },
      {
        spotId: 10,
        userId: 7,
        review: "Amazing.",
        stars: 4
      },
      {
        spotId: 11,
        userId: 6,
        review: "Intersting.",
        stars: 5
      },
      {
        spotId: 12,
        userId: 5,
        review: "Wonderful.",
        stars: 4
      }


    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
    }, {});
  }
};
