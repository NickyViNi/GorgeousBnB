'use strict';

/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');
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
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'spotImage1-1 url',
        preview: true,
      },
      {
        spotId: 1,
        url: 'spotImage1-2 url',
        preview: true,
      },
      {
        spotId: 1,
        url: 'spotImage1-3 url',
        preview: true,
      },
      {
        spotId: 2,
        url: 'spotImage2-1 url',
        preview: false,
      },
      {
        spotId: 2,
        url: 'spotImage2-2 url',
        preview: false,
      },
      {
        spotId: 2,
        url: 'spotImage2-3 url',
        preview: true,
      },
      {
        spotId: 3,
        url: 'spotImage3-1 url',
        preview: false,
      },
      {
        spotId: 3,
        url: 'spotImage3-2 url',
        preview: true,
      },
      {
        spotId: 4,
        url: 'spotImage4-1 url',
        preview: false,
      },
      {
        spotId: 4,
        url: 'spotImage4-2 url',
        preview: true,
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
