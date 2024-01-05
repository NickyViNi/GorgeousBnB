'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

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
    await User.bulkCreate([
      {
        email: 'davecode@user.io',
        username: 'daveCode',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Dave',
        lastName: 'Code'
      },
      {
        email: 'mattthooy@user.io',
        username: 'mattThooy',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Matt',
        lastName: 'Thooy'
      },
      {
        email: 'dennihook@user.io',
        username: 'denniHook',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Denni',
        lastName: 'Hook'
      },

      {
        email: "vince@gmail.com",
        username: "vinceStar",
        hashedPassword: bcrypt.hashSync('password520'),
        firstName: "Vince",
        lastName: "Star"
     },

     {
      email: "sillvina@gmail.com",
      username: "sillvinaKing",
      hashedPassword: bcrypt.hashSync('password521'),
      firstName: "Sillvina",
      lastName: "King"
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
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['daveCode', 'mattThooy', 'denniHook', "vinceStar", "sillvinaKing"] }
    }, {});
  }
};
