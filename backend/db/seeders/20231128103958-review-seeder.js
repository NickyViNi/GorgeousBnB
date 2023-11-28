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
        userId: 4,
        review: 'Good spot, highly recommand.',
        stars: 3
      },
      {
        spotId: 2,
        userId: 3,
        review: 'I love this wonderful spot.',
        stars: 4
      },
      {
        spotId: 3,
        userId: 2,
        review: "It's such a fantastic spot.",
        stars: 5
      },
      {
        spotId: 4,
        userId: 1,
        review: 'Enjoying living in this beautiful castle!',
        stars: 5
      },


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
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
