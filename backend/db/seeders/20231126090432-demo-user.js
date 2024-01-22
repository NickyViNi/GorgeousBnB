'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const users = [
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

  {
    email: "iloveyou@gmail.com",
    username: "cocoFresh",
    hashedPassword: bcrypt.hashSync('password522'),
    firstName: "Coco",
    lastName: "Fresh"
  },

  {
    email: "brianballard@gmail.com",
    username: "brianBallard",
    hashedPassword: bcrypt.hashSync('password523'),
    firstName: "Brian",
    lastName: "Ballard"
  },

  {
    email: "lancemoreno@gmail.com",
    username: "lanceMoreno",
    hashedPassword: bcrypt.hashSync('password524'),
    firstName: "Lance",
    lastName: "Moreno"
  },
]

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
    await User.bulkCreate(users, { validate: true });
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
      username: { [Op.in]: users.map((user) => user.username) }
    }, {});
  }
};
